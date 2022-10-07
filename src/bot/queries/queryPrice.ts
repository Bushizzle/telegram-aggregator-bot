import * as TelegramBot from 'node-telegram-bot-api';
import { editMessageText, getPriceLabel } from '../../helpers';
import { keyboardPrice } from '../../keyboards';
import { TUser } from '../../types';

export const botPrice = (bot: TelegramBot, user: TUser, chatId: number, msgId: number) => {
  void editMessageText(
    bot,
    `Цена (выбрано: ${getPriceLabel(user.settings.price)})`,
    chatId,
    msgId,
    keyboardPrice(user),
  );
};
