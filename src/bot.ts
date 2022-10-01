import * as TelegramBot from 'node-telegram-bot-api';
import type { InlineKeyboardButton } from 'node-telegram-bot-api';
import { keyboardMain, keyboardDistricts, keyboardPrice } from './keyboards';

import { ERR_SERVER, ERR_NO_USER, MSG_ABOUT, ALL_DISTRICTS_KEYS } from './constants';

import { addUser, editUserSettings, removeUser, findUser, getDistrictsNames, getDistrictId, getPrice } from './helpers';

import { notifyWelcome, notifyConfig } from './helpers/notifications';
import type { TAptData, TUser } from './types';
import type { TLambdaResponse } from './types';

import { Reporter } from './helpers';

const editMessageText = (
  bot: TelegramBot,
  replyText: string,
  chatId: number,
  messageId: number,
  inlineKeyboard: InlineKeyboardButton[][],
) =>
  bot.editMessageText(replyText, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });

export const broadcastBotSetup = (bot: TelegramBot, users: TUser[], usersLambda: string): void => {
  bot.on('message', msg => {
    const { from, text } = msg;

    if (!from?.id || !from?.username) return false;

    switch (text) {
      case '/help':
        void bot.sendMessage(from.id, MSG_ABOUT);
        break;
      case '/start':
        void addUser(users, from.id, from.first_name, from.username, usersLambda)
          .then(({ message, welcomed }: TLambdaResponse) => {
            if (!welcomed) void notifyWelcome(from.id, bot);
            void bot.sendMessage(from.id, message);
          })
          .catch(err => {
            void bot.sendMessage(from.id, ERR_SERVER);
            Reporter.error([from.id, err], bot);
          });
        break;
      case '/stop':
        void removeUser(users, from.id, usersLambda)
          .then(({ message }) => {
            void bot.sendMessage(from.id, message);
          })
          .catch(err => {
            void bot.sendMessage(from.id, ERR_SERVER);
            Reporter.error([from.id, err], bot);
          });
        break;
      case '/set': {
        const user = findUser(users, from.id);
        if (user?.settings.active) {
          if (!user?.notifications?.config) void notifyConfig(from.id, bot);
          void bot.sendMessage(from.id, 'Настройки', {
            reply_markup: {
              inline_keyboard: keyboardMain(),
            },
          });
        } else {
          void bot.sendMessage(from.id, ERR_NO_USER);
        }
        break;
      }
    }
  });

  bot.on('callback_query', callbackQuery => {
    const user_id = callbackQuery.from.id;
    const action = callbackQuery?.data;
    const msg_id = callbackQuery?.message?.message_id;
    const chat_id = callbackQuery.from.id;

    const user = findUser(users, user_id);

    if (!user?.settings.active || !msg_id) {
      void bot.sendMessage(user_id, ERR_NO_USER);
      return;
    }

    if (!action) {
      void bot.sendMessage(user_id, ERR_SERVER);
      return;
    }

    if (action === 'return_to_main') {
      void editMessageText(bot, 'Настройки', chat_id, msg_id, keyboardMain());
    } else if (action === 'district') {
      void editMessageText(
        bot,
        `Районы: ${getDistrictsNames(user.settings.districts)}`,
        chat_id,
        msg_id,
        keyboardDistricts(user.settings.districts),
      );
    } else if (action === 'price') {
      void editMessageText(bot, 'Цена', chat_id, msg_id, keyboardPrice(user));
    } else if (action.includes('setDistrict:')) {
      let {
        settings: { districts },
      } = user;
      let value = action.substring('setDistrict:'.length);

      if (value === 'all') districts = ALL_DISTRICTS_KEYS;
      if (value === 'none') districts = [];
      else {
        if (districts.includes(+value)) districts.splice(districts.indexOf(+value), 1);
        else districts.push(+value);
      }

      editUserSettings(users, user_id, { districts }, usersLambda)
        .then(() => {
          void editMessageText(bot, 'Районы:', chat_id, msg_id, keyboardDistricts(districts));
        })
        .catch(err => {
          void bot.sendMessage(user_id, ERR_SERVER);
          Reporter.error([user_id, err], bot);
        });
    } else if (action.includes('setPrice:')) {
      const {
        settings: { price },
      } = user;
      const value = +action.substring('setPrice:'.length);
      if (price !== value) {
        editUserSettings(users, user_id, { price: value }, usersLambda)
          .then(() => {
            user.settings.price = value;
            void editMessageText(bot, 'Цена:', chat_id, msg_id, keyboardPrice(user));
          })
          .catch(err => {
            void bot.sendMessage(user_id, ERR_SERVER);
            Reporter.error([user_id, err], bot);
          });
      }
    }
  });
};

export const broadcastBotNotify = (
  bot: TelegramBot,
  { data, message }: { data: TAptData; message: string },
  users: TUser[],
  isProd: boolean,
) => {
  const districtId = getDistrictId(data.district);
  const priceValue = data.price?.match(/\d{2,6}/)?.[0];

  if (districtId && priceValue) {
    const targetUsers = isProd
      ? users
          .filter(user => user.settings.active)
          .filter(user => user.settings.districts.includes(districtId))
          .filter(user => getPrice(user.settings.price)?.expression(+priceValue))
      : users
          .filter(user => +user.userId === 181749991)
          .filter(user => user.settings.active)
          .filter(user => user.settings.districts.includes(districtId))
          .filter(user => getPrice(user.settings.price)?.expression(+priceValue));

    if (targetUsers.length) {
      targetUsers.forEach(({ userId }) => bot.sendMessage(userId, message));
    }
  }
};
