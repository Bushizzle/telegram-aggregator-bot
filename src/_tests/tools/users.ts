import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import { TUser, TUserSettings } from '../../types';
import { findUser } from '../../helpers';
import { repairSettings } from '../../helpers/user';

const LAMBDA = 'https://kbtv5ixebd.execute-api.eu-south-1.amazonaws.com/rent-bot-users';

export const loadAllUsers = (): Promise<TUser[]> => {
  return fetch(LAMBDA)
    .then(res => res.json())
    .then(({ Items }) => [...Items]);
};

const sendToLambda = (method: string, data: Partial<TUser>, url: string): Promise<AWS.DynamoDB.ItemResponseList> =>
  fetch(url, {
    method,
    // mode: 'cors',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const editUserSettings = async (users: TUser[], userId: number, settings: Partial<TUserSettings>, url: string) =>
  new Promise((resolve, reject) => {
    const user = findUser(users, userId)!;
    const modifiedUser = {
      ...user,
      settings: repairSettings({
        ...user.settings,
        ...settings,
      }),
      notifications: user?.notifications
        ? {
            ...user.notifications,
            config: true,
          }
        : {
            welcome: false,
            config: true,
          },
    };
    return sendToLambda('PUT', modifiedUser, url)
      .then(result => {
        users.splice(users.indexOf(user), 1, modifiedUser);
        resolve({ result, status: 'OK' });
      })
      .catch(err => reject(err));
  });

// const type = (x: any, type: string) => typeof x === type;

// const checkUser = (user: TUser) => {
//   const {
//     userId,
//     name,
//     userName,
//     settings: { districts, price },
//   } = user;
//   const res = typeof type(userId, 'number') && type(name, 'string') && type(userName, 'string') && districts && price;
//   console.log(res);
// };

loadAllUsers().then(res => {
  // const corrupted = res.filter(user => user.settings.districts.includes(null));
  const active = res.filter(user => user.settings.active);
  console.log(active.slice(0, 100).forEach(user => console.log(user.settings.districts)));

  // corrupted.forEach((user, i) => {
  //   setTimeout(() => {
  //     void editUserSettings(res, user.userId, repairSettings(user.settings), LAMBDA);
  //   }, i * 100);
  // });
});
