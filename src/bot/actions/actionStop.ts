import * as TelegramBot from 'node-telegram-bot-api';
import { removeUser, Reporter } from '../../helpers';
import { ERR_SERVER } from '../../constants';

export const botStop = (from: TelegramBot.Message['from']) => {
  from &&
    from.username &&
    void removeUser(from.id)
      .then(({ message }) => {
        void global.bot.sendMessage(from.id, message);
      })
      .catch(err => {
        void global.bot.sendMessage(from.id, ERR_SERVER);
        Reporter.error([from.id, err]);
      });
};
