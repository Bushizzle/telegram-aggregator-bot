import { editMessageText, editUserSettings, getPriceLabel, Reporter } from '../../helpers';
import { keyboardPrice } from '../../keyboards';
import { ERR_SERVER } from '../../constants';
import { TUser } from '../../types';

export const botSetPrice = (action: string, user: TUser, chatId: number, msgId: number, userId: number) => {
  const {
    settings: { price },
  } = user;
  const value = +action.substring('setPrice:'.length);
  if (price !== value) {
    const oldPrice = user.settings.price;
    user.settings.price = value;
    void editMessageText(`Цена (выбрано: ${getPriceLabel(user.settings.price)})`, chatId, msgId, keyboardPrice(user));
    editUserSettings(userId, { price: value }).catch(err => {
      user.settings.price = oldPrice;
      void editMessageText(`Цена (выбрано: ${getPriceLabel(oldPrice)})`, chatId, msgId, keyboardPrice(user));
      void global.bot.sendMessage(userId, ERR_SERVER);
      Reporter.error([userId, err]);
    });
  }
};
