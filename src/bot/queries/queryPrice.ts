import { editMessageText, getPriceLabel } from '../../helpers';
import { keyboardPrice } from '../../keyboards';
import { TUser } from '../../types';

export const botPrice = (user: TUser, chatId: number, msgId: number) => {
  void editMessageText(`Цена (выбрано: ${getPriceLabel(user.settings.price)})`, chatId, msgId, keyboardPrice(user));
};
