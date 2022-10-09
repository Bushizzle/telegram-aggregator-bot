import { findUser } from '../../helpers';
import { notifyConfig } from '../../helpers/notifications';
import { keyboardMain } from '../../keyboards';
import { ERR_NO_USER } from '../../constants';
import { Storage } from '../../storage';

export const botSet = (userId: number) => {
  const users = Storage.getUsers();
  const user = findUser(users, userId);
  if (user?.settings.active) {
    if (!user?.notifications?.config) void notifyConfig(userId);
    void global.bot.sendMessage(userId, 'Настройки', {
      reply_markup: {
        inline_keyboard: keyboardMain(),
      },
    });
  } else {
    void global.bot.sendMessage(userId, ERR_NO_USER);
  }
};
