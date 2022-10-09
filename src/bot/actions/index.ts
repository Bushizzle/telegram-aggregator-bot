import * as TelegramBot from 'node-telegram-bot-api';
import { TUser } from '../../types';

import { botHelp } from './actionHelp';
import { botStart } from './actionStart';
import { botStop } from './actionStop';
import { botSet } from './actionSet';

export const botMessageHandler = (bot: TelegramBot, msg: TelegramBot.Message, users: TUser[], usersLambda: string) => {
  const { from, text } = msg;

  if (!from?.id || !from?.username) return false;

  switch (text) {
    case '/help':
      botHelp(bot, from.id);
      break;
    case '/start':
      botStart(bot, users, from, usersLambda);
      break;
    case '/stop':
      botStop(bot, users, from, usersLambda);
      break;
    case '/set': {
      botSet(bot, users, from.id);
      break;
    }
  }
};
