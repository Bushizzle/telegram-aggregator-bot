import { ALL_DISTRICTS_KEYS, ERR_SERVER } from '../../constants';
import { editMessageText, editUserSettings, Reporter } from '../../helpers';
import { keyboardDistricts } from '../../keyboards';
import { TUser } from '../../types';
import { Storage } from '../../storage';

export const botSetDistrict = (action: string, user: TUser, chatId: number, msgId: number, userId: number) => {
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
    `Районы (выбрано: ${selectedDistricts.length})`,
    chatId,
    msgId,
    keyboardDistricts(selectedDistricts),
  );

  editUserSettings(userId, { districts: selectedDistricts }).catch(err => {
    user.settings.districts = oldDistrictsValue.slice();
    void editMessageText(
      `Районы (выбрано: ${oldDistrictsValue.length})`,
      chatId,
      msgId,
      keyboardDistricts(oldDistrictsValue),
    );
    void Storage.bot.sendMessage(userId, ERR_SERVER);
    Reporter.error([userId, err]);
  });
};
