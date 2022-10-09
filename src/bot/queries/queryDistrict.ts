import * as TelegramBot from 'node-telegram-bot-api';
import { editMessageText } from '../../helpers';
import { keyboardDistricts } from '../../keyboards';
import { repairSettings } from '../../helpers/user';
import { TUser } from '../../types';

export const botDistrict = (bot: TelegramBot, user: TUser, chatId: number, msgId: number) => {
  void editMessageText(
    bot,
    `Районы (выбрано: ${user.settings.districts.length})`,
    chatId,
    msgId,
    keyboardDistricts(repairSettings(user.settings).districts),
  );
};
