import * as TelegramBot from 'node-telegram-bot-api';
import { TUser } from '../types';
import { botMessageHandler } from './actions';
import { botReactionsHandler } from './reactions';

export const botSetup = (bot: TelegramBot, users: TUser[], usersLambda: string): void => {
  bot.on('message', msg => botMessageHandler(bot, msg, users, usersLambda));

  bot.on('callback_query', callbackQuery => botReactionsHandler(bot, callbackQuery, users, usersLambda));
};
