import * as TelegramBot from 'node-telegram-bot-api';
import { TAptData, TUser } from '../types';
import { getDistrictId, getPrice, removeUser } from '../helpers';
import { messagesInterval } from '../helpers/channelMessages';

export const botBroadcast = (
  bot: TelegramBot,
  { data, message }: { data: TAptData; message: string },
  users: TUser[],
  usersLambda: string,
) => {
  const districtId = getDistrictId(data.district);
  const priceValue = data.price?.match(/\d{2,6}/)?.[0];

  if (districtId && priceValue) {
    const targetUsers = users
      .filter(user => user.settings.active)
      .filter(user => user.settings.districts.includes(districtId))
      .filter(user => getPrice(user.settings.price)?.expression(+priceValue));

    if (targetUsers.length) {
      messagesInterval(
        targetUsers,
        userId => {
          bot.sendMessage(userId, message).catch(error => {
            if (error?.response?.statusCode === 403) {
              void removeUser(users, userId, usersLambda);
            }
          });
        },
        20,
        500,
      );
    }
  }
};
