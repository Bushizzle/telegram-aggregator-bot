import { TAptData } from '../types';
import { removeUser } from '../helpers';
import { messagesInterval } from '../helpers/channelMessages';
import { Storage } from '../storage';
import { usersFilter } from './filters';

export const botBroadcast = ({ data, message }: { data: TAptData; message: string }) => {
  const targetUsers = usersFilter(Storage.users, data);

  if (data?.district && targetUsers.length) {
    messagesInterval(
      targetUsers,
      userId => {
        Storage.bot.sendMessage(userId, message).catch(error => {
          if (error?.response?.statusCode === 403) {
            void removeUser(userId);
          }
        });
      },
      20,
      500,
    );
  }
};
