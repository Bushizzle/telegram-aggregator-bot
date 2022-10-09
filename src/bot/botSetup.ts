import * as TelegramBot from 'node-telegram-bot-api';
import { TUser } from '../types';
import { botMessageHandler } from './actions';
import { botQueryHandler } from './queries';

export const botSetup = (bot: TelegramBot, users: TUser[], usersLambda: string): void => {
  bot.on('message', msg => botMessageHandler(bot, msg, users, usersLambda));
  bot.on('callback_query', callbackQuery => botQueryHandler(bot, callbackQuery, users, usersLambda));
};
