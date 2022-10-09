import * as TelegramBot from 'node-telegram-bot-api';
import { MSG_ABOUT } from '../../constants';

export const botHelp = (bot: TelegramBot, id: number) => void bot.sendMessage(id, MSG_ABOUT);
