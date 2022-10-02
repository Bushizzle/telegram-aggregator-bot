import * as TelegramBot from 'node-telegram-bot-api';
import { WELCOME_CONFIGURATION, WELCOME_START } from '../constants';

export const notifyUser = (userID: number, bot: TelegramBot, message: string) => bot.sendMessage(userID, message);

export const notifyWelcome = (userId: number, bot: TelegramBot) => notifyUser(userId, bot, WELCOME_START);

export const notifyConfig = (userId: number, bot: TelegramBot) => notifyUser(userId, bot, WELCOME_CONFIGURATION);
