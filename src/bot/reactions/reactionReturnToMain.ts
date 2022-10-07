import * as TelegramBot from 'node-telegram-bot-api';
import { editMessageText } from '../../helpers';
import { keyboardMain } from '../../keyboards';

export const botReturnToMain = (bot: TelegramBot, chatId: number, msgId: number) =>
  void editMessageText(bot, 'Настройки', chatId, msgId, keyboardMain());
