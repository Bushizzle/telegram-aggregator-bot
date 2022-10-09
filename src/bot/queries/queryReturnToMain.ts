import { editMessageText } from '../../helpers';
import { keyboardMain } from '../../keyboards';

export const botReturnToMain = (chatId: number, msgId: number) =>
  void editMessageText('Настройки', chatId, msgId, keyboardMain());
