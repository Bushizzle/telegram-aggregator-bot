import * as TelegramBot from 'node-telegram-bot-api';
import { botHelp } from './actionHelp';
import { botStart } from './actionStart';
import { botStop } from './actionStop';
import { botSet } from './actionSet';

export const botMessageHandler = (msg: TelegramBot.Message) => {
  const { from, text } = msg;

  if (!from?.id || !from?.username) return false;

  switch (text) {
    case '/help':
      botHelp(from.id);
      break;
    case '/start':
      botStart(from);
      break;
    case '/stop':
      botStop(from);
      break;
    case '/set': {
      botSet(from.id);
      break;
    }
  }
};
