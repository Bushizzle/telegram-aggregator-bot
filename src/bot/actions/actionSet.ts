import * as TelegramBot from 'node-telegram-bot-api';
import { findUser } from '../../helpers';
import { notifyConfig } from '../../helpers/notifications';
import { keyboardMain } from '../../keyboards';
import { ERR_NO_USER } from '../../constants';
import { TUser } from '../../types';

export const botSet = (bot: TelegramBot, users: TUser[], userId: number) => {
  const user = findUser(users, userId);
  if (user?.settings.active) {
    if (!user?.notifications?.config) void notifyConfig(userId, bot);
    void bot.sendMessage(userId, 'Настройки', {
      reply_markup: {
        inline_keyboard: keyboardMain(),
      },
    });
  } else {
    void bot.sendMessage(userId, ERR_NO_USER);
  }
};
