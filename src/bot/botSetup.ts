import * as Bot from 'node-telegram-bot-api';
import { Storage } from '../storage';
import { botMessageHandler } from './actions';
import { botQueryHandler } from './queries';

export const botSetup = (token: string): void => {
  Storage.bot = new Bot(token, { polling: true });
  Storage.bot.on('message', msg => botMessageHandler(msg));
  Storage.bot.on('callback_query', callbackQuery => botQueryHandler(callbackQuery));
};
