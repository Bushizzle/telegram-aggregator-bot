import * as TelegramBot from 'node-telegram-bot-api';
import { addUser, Reporter } from '../../helpers';
import { TLambdaResponse, TUser } from '../../types';
import { notifyWelcome } from '../../helpers/notifications';
import { ERR_SERVER } from '../../constants';

export const botStart = (bot: TelegramBot, users: TUser[], from: TelegramBot.Message['from'], usersLambda: string) => {
  from &&
    from.username &&
    void addUser(users, from.id, from.first_name, from.username, usersLambda)
      .then(({ message, welcomed }: TLambdaResponse) => {
        if (!welcomed) void notifyWelcome(from.id, bot);
        void bot.sendMessage(from.id, message);
      })
      .catch(err => {
        void bot.sendMessage(from.id, ERR_SERVER);
        Reporter.error([from.id, err], bot);
      });
};
