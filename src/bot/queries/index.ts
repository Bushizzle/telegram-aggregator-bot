import * as TelegramBot from 'node-telegram-bot-api';
import { findUser } from '../../helpers';
import { ERR_NO_USER, ERR_SERVER } from '../../constants';

import { Storage } from '../../storage';
import { botReturnToMain } from './queryReturnToMain';
import { botDistrict } from './queryDistrict';
import { botPrice } from './queryPrice';
import { botSetDistrict } from './querySetDistrict';
import { botSetPrice } from './querySetPrice';

export const botQueryHandler = (callbackQuery: TelegramBot.CallbackQuery) => {
  const users = Storage.users;
  const user_id = callbackQuery.from.id;
  const action = callbackQuery?.data;
  const msg_id = callbackQuery?.message?.message_id;
  const chat_id = callbackQuery.from.id;

  const user = findUser(users, user_id);

  if (!user?.settings.active || !msg_id) {
    void Storage.bot.sendMessage(user_id, ERR_NO_USER);
    return;
  }

  if (!action) {
    void Storage.bot.sendMessage(user_id, ERR_SERVER);
    return;
  }

  if (action === 'return_to_main') {
    botReturnToMain(chat_id, msg_id);
  } else if (action === 'district') {
    botDistrict(user, chat_id, msg_id);
  } else if (action === 'price') {
    botPrice(user, chat_id, msg_id);
  } else if (action.includes('setDistrict:')) {
    botSetDistrict(action, user, chat_id, msg_id, user_id);
  } else if (action.includes('setPrice:')) {
    botSetPrice(action, user, chat_id, msg_id, user_id);
  }
};
