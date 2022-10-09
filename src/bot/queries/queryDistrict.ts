import { editMessageText } from '../../helpers';
import { keyboardDistricts } from '../../keyboards';
import { repairSettings } from '../../helpers/user';
import { TUser } from '../../types';

export const botDistrict = (user: TUser, chatId: number, msgId: number) => {
  void editMessageText(
    `Районы (выбрано: ${user.settings.districts.length})`,
    chatId,
    msgId,
    keyboardDistricts(repairSettings(user.settings).districts),
  );
};
