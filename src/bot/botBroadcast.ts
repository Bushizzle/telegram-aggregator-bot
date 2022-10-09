import { TAptData } from '../types';
import { getDistrictId, getPrice, removeUser } from '../helpers';
import { messagesInterval } from '../helpers/channelMessages';
import { Storage } from '../storage';

export const botBroadcast = ({ data, message }: { data: TAptData; message: string }) => {
  const districtId = getDistrictId(data.district);
  const priceValue = data.price?.match(/\d{2,6}/)?.[0];
  const users = Storage.getUsers();

  if (districtId && priceValue) {
    const targetUsers = users
      .filter(user => user.settings.active)
      .filter(user => user.settings.districts.includes(districtId))
      .filter(user => getPrice(user.settings.price)?.expression(+priceValue));

    if (targetUsers.length) {
      messagesInterval(
        targetUsers,
        userId => {
          global.bot.sendMessage(userId, message).catch(error => {
            if (error?.response?.statusCode === 403) {
              void removeUser(userId);
            }
          });
        },
        20,
        500,
      );
    }
  }
};
