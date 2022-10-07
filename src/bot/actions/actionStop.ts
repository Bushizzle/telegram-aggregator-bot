import * as TelegramBot from 'node-telegram-bot-api';
import { removeUser, Reporter } from '../../helpers';
import { TUser } from '../../types';
import { ERR_SERVER } from '../../constants';

export const botStop = (bot: TelegramBot, users: TUser[], from: TelegramBot.Message['from'], usersLambda: string) => {
  from &&
    from.username &&
    void removeUser(users, from.id, usersLambda)
      .then(({ message }) => {
        void bot.sendMessage(from.id, message);
      })
      .catch(err => {
        void bot.sendMessage(from.id, ERR_SERVER);
        Reporter.error([from.id, err], bot);
      });
};
