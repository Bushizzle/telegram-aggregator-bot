import * as TelegramBot from 'node-telegram-bot-api';
import { findUser } from '../../helpers';
import { ERR_NO_USER, ERR_SERVER } from '../../constants';
import { TUser } from '../../types';

import { botReturnToMain } from './reactionReturnToMain';
import { botDistrict } from './reactionDistrict';
import { botPrice } from './reactionPrice';
import { botSetDistrict } from './reactionSetDistrict';
import { botSetPrice } from './reactionSetPrice';

export const botReactionsHandler = (
  bot: TelegramBot,
  callbackQuery: TelegramBot.CallbackQuery,
  users: TUser[],
  usersLambda: string,
) => {
  const user_id = callbackQuery.from.id;
  const action = callbackQuery?.data;
  const msg_id = callbackQuery?.message?.message_id;
  const chat_id = callbackQuery.from.id;

  const user = findUser(users, user_id);

  if (!user?.settings.active || !msg_id) {
    void bot.sendMessage(user_id, ERR_NO_USER);
    return;
  }

  if (!action) {
    void bot.sendMessage(user_id, ERR_SERVER);
    return;
  }

  if (action === 'return_to_main') {
    botReturnToMain(bot, chat_id, msg_id);
  } else if (action === 'district') {
    botDistrict(bot, user, chat_id, msg_id);
  } else if (action === 'price') {
    botPrice(bot, user, chat_id, msg_id);
  } else if (action.includes('setDistrict:')) {
    botSetDistrict(bot, action, user, users, chat_id, msg_id, user_id, usersLambda);
  } else if (action.includes('setPrice:')) {
    botSetPrice(bot, action, user, users, chat_id, msg_id, user_id, usersLambda);
  }
};
