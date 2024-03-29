import fetch from 'node-fetch';
import * as AWS from 'aws-sdk';
import {
  SUCCESS_SUBSCRIBE,
  ERR_DUPLICATE,
  SUCCESS_UNSUBSCRIBE,
  ERR_NOT_SUBSCRIBED,
  ERR_NO_USER,
  ALL_DISTRICTS_KEYS,
} from '../constants';
import { TLambdaResponse, TUser, TUserSettings } from '../types';
import { Storage } from '../storage';

const newUser = (userId: number, name: string, userName: string): TUser => ({
  userId,
  name,
  userName,
  settings: {
    price: 6,
    districts: ALL_DISTRICTS_KEYS,
    active: true,
  },
  notifications: {
    welcome: true,
    config: false,
  },
});

export const findUser = (users: TUser[], id: number): TUser | undefined => users.find(({ userId }) => userId === id);

const sendToLambda = (method: string, data: Partial<TUser>, url: string): Promise<AWS.DynamoDB.ItemResponseList> =>
  fetch(url, {
    method,
    // mode: 'cors',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const addUser = async (userId: number, name: string, userName: string): Promise<TLambdaResponse> =>
  new Promise((resolve, reject) => {
    const usersLambda = Storage.api.usersLambda;
    const users = Storage.users;
    const user = findUser(users, userId);
    if (!user) {
      const createdUser = newUser(userId, name, userName);
      return sendToLambda('POST', createdUser, usersLambda)
        .then(() => {
          users.push(createdUser);
          Storage.users = users;
          resolve({
            status: 'OK',
            message: SUCCESS_SUBSCRIBE,
            welcomed: false,
          });
        })
        .catch(err => reject(err));
    }
    if (!user?.settings.active) {
      const modifiedUser = {
        ...user,
        settings: {
          ...user.settings,
          active: true,
        },
        notifications: user?.notifications
          ? {
              ...user.notifications,
              welcome: true,
            }
          : {
              welcome: false,
              config: false,
            },
      };
      return sendToLambda('PUT', modifiedUser, usersLambda).then(() => {
        users.splice(users.indexOf(user), 1, modifiedUser);
        Storage.users = users;
        resolve({
          status: 'OK',
          message: SUCCESS_SUBSCRIBE,
          welcomed: user?.notifications?.welcome,
        });
      });
    } else {
      resolve({ status: 'ERR', message: ERR_DUPLICATE, welcomed: true });
    }
  });

// FIXME fix null values
export const repairSettings = (settings: TUserSettings): TUserSettings => ({
  ...settings,
  districts: settings.districts.filter(el => el !== null),
});

export const editUserSettings = async (userId: number, settings: Partial<TUserSettings>) =>
  new Promise((resolve, reject) => {
    const usersLambda = Storage.api.usersLambda;
    const users = Storage.users;
    const user = findUser(users, userId);
    if (user?.settings.active) {
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
      return sendToLambda('PUT', modifiedUser, usersLambda)
        .then(result => {
          users.splice(users.indexOf(user), 1, modifiedUser);
          Storage.users = users;
          resolve({ result, status: 'OK' });
        })
        .catch(err => reject(err));
    }
    resolve({ status: 'ERR', message: ERR_NO_USER });
  });

export const removeUser = async (userId: number): Promise<TLambdaResponse> =>
  new Promise((resolve, reject) => {
    const usersLambda = Storage.api.usersLambda;
    const users = Storage.users;
    const user = findUser(users, userId);
    const modifiedUser = user && {
      ...user,
      settings: repairSettings({
        ...user.settings,
        active: false,
      }),
    };
    if (user?.settings.active && modifiedUser) {
      return sendToLambda('PUT', modifiedUser, usersLambda)
        .then(() => {
          users.splice(users.indexOf(user), 1, modifiedUser);
          Storage.users = users;
          resolve({ status: 'OK', message: SUCCESS_UNSUBSCRIBE });
        })
        .catch(err => reject(err));
    } else {
      resolve({ status: 'ERR', message: ERR_NOT_SUBSCRIBED });
    }
  });

export const loadAllUsers = (lambdaUrl: string): Promise<TUser[]> => {
  return fetch(lambdaUrl)
    .then(res => res.json())
    .then(({ Items }) => [...Items]);
};
