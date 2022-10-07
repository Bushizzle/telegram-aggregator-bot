import * as TelegramBot from 'node-telegram-bot-api';
import { editMessageText, editUserSettings, getPriceLabel, Reporter } from '../../helpers';
import { keyboardPrice } from '../../keyboards';
import { ERR_SERVER } from '../../constants';
import { TUser } from '../../types';

export const botSetPrice = (
  bot: TelegramBot,
  action: string,
  user: TUser,
  users: TUser[],
  chatId: number,
  msgId: number,
  userId: number,
  usersLambda: string,
) => {
  const {
    settings: { price },
  } = user;
  const value = +action.substring('setPrice:'.length);
  if (price !== value) {
    const oldPrice = user.settings.price;
    user.settings.price = value;
    void editMessageText(
      bot,
      `Цена (выбрано: ${getPriceLabel(user.settings.price)})`,
      chatId,
      msgId,
      keyboardPrice(user),
    );
    editUserSettings(users, userId, { price: value }, usersLambda).catch(err => {
      user.settings.price = oldPrice;
      void editMessageText(bot, `Цена (выбрано: ${getPriceLabel(oldPrice)})`, chatId, msgId, keyboardPrice(user));
      void bot.sendMessage(userId, ERR_SERVER);
      Reporter.error([userId, err], bot);
    });
  }
};
