import * as TelegramBot from 'node-telegram-bot-api';
import { ALL_DISTRICTS_KEYS, ERR_SERVER } from '../../constants';
import { editMessageText, editUserSettings, Reporter } from '../../helpers';
import { keyboardDistricts } from '../../keyboards';
import { TUser } from '../../types';

export const botSetDistrict = (
  bot: TelegramBot,
  action: string,
  user: TUser,
  users: TUser[],
  chatId: number,
  msgId: number,
  userId: number,
  usersLambda: string,
) => {
  let {
    settings: { districts: selectedDistricts },
  } = user;
  let value = action.substring('setDistrict:'.length);
  const oldDistrictsValue = selectedDistricts.slice();

  if (value === 'all') selectedDistricts = ALL_DISTRICTS_KEYS;
  if (value === 'none') selectedDistricts = [];
  else {
    if (selectedDistricts.includes(+value)) selectedDistricts.splice(selectedDistricts.indexOf(+value), 1);
    else selectedDistricts.push(+value);
  }

  void editMessageText(
    bot,
    `Районы (выбрано: ${selectedDistricts.length})`,
    chatId,
    msgId,
    keyboardDistricts(selectedDistricts),
  );

  editUserSettings(users, userId, { districts: selectedDistricts }, usersLambda).catch(err => {
    user.settings.districts = oldDistrictsValue.slice();
    void editMessageText(
      bot,
      `Районы (выбрано: ${oldDistrictsValue.length})`,
      chatId,
      msgId,
      keyboardDistricts(oldDistrictsValue),
    );
    void bot.sendMessage(userId, ERR_SERVER);
    Reporter.error([userId, err], bot);
  });
};
