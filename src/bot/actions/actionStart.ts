import * as TelegramBot from 'node-telegram-bot-api';
import { addUser, Reporter } from '../../helpers';
import { TLambdaResponse } from '../../types';
import { notifyWelcome } from '../../helpers/notifications';
import { ERR_SERVER } from '../../constants';

export const botStart = (from: TelegramBot.Message['from']) => {
  from &&
    from.username &&
    void addUser(from.id, from.first_name, from.username)
      .then(({ message, welcomed }: TLambdaResponse) => {
        if (!welcomed) void notifyWelcome(from.id);
        void global.bot.sendMessage(from.id, message);
      })
      .catch(err => {
        void global.bot.sendMessage(from.id, ERR_SERVER);
        Reporter.error([from.id, err]);
      });
};
