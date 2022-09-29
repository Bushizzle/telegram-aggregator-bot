const fetch = require('node-fetch');
const {
  keyboardMain,
  keyboardDistricts,
  keyboardPrice,
} = require('./keyboards');

const {
  ERR_SERVER,
  ERR_NO_USER,
  MSG_ABOUT,
  ALL_DISTRICTS_KEYS,
} = require('./constants');

const {
  addUser,
  editUserSettings,
  removeUser,
  findUser,
  getDistrictsNames,
  getDistrictId,
  getPriceExpression,
} = require('./helpers');

const { notifyWelcome, notifyConfig } = require('./helpers/notifications');

const { USERS_LAMBDA } = process.env;

const reportError = (id, msg) => {
  console.log('Custom error:');
  console.log(id, msg);
};

const users = [];

fetch(USERS_LAMBDA)
  .then((res) => res.json())
  .then(({ Items }) => users.push(...Items))
  .then(() => console.log(users));

const editMessageText = (bot, replyText, chatId, messageId, inlineKeyboard) => bot.editMessageText(replyText, {
  chat_id: chatId,
  message_id: messageId,
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: inlineKeyboard,
  },
});

const broadcastBotSetup = (bot) => {
  bot.on('message', async (msg) => {
    const { chat, from, text } = msg;

    // console.log(chat, from, text);

    if (text === '/help') {
      bot.sendMessage(from.id, MSG_ABOUT);
    } else if (text === '/start') {
      addUser(users, from.id, from.first_name, from.username)
        .then(({ message, welcomed }) => {
          if (!welcomed) notifyWelcome(from.id, bot);
          bot.sendMessage(from.id, message);
        })
        .catch((err) => {
          bot.sendMessage(from.id, ERR_SERVER);
          reportError(from.id, err);
        });
    } else if (text === '/stop') {
      removeUser(users, from.id)
        .then(({ message }) => {
          bot.sendMessage(from.id, message);
        })
        .catch((err) => {
          bot.sendMessage(from.id, ERR_SERVER);
          reportError(from.id, err);
        });
    } else if (text === '/set') {
      const user = findUser(users, from.id);
      if (user?.settings.active) {
        if (!user?.notifications?.config) notifyConfig(from.id, bot);
        bot.sendMessage(msg.from.id, 'Настройки', {
          reply_markup: {
            inline_keyboard: keyboardMain(),
          },
        });
      } else {
        bot.sendMessage(from.id, ERR_NO_USER);
      }
    }
  });

  bot.on('callback_query', (callbackQuery) => {
    const user_id = callbackQuery.from.id;
    const action = callbackQuery.data;
    const msg_id = callbackQuery.message.message_id;
    const chat_id = callbackQuery.from.id;

    const user = findUser(users, user_id);

    if (!user?.settings.active) {
      bot.sendMessage(user_id, ERR_NO_USER);
      return;
    }

    if (action === 'return_to_main') {
      editMessageText(bot, 'Настройки', chat_id, msg_id, keyboardMain());
    } else if (action === 'district') {
      editMessageText(bot, `Районы: ${getDistrictsNames(user.settings.districts)}`, chat_id, msg_id, keyboardDistricts(user.settings.districts));
    } else if (action === 'price') {
      editMessageText(bot, 'Цена', chat_id, msg_id, keyboardPrice(user));
    } else if (action.includes('setDistrict:')) {
      let { settings: { districts } } = user;
      let value = action.substring('setDistrict:'.length);

      if (value === 'all') districts = ALL_DISTRICTS_KEYS;
      if (value === 'none') districts = [];
      else {
        value = +value;
        if (districts.includes(value)) districts.splice(districts.indexOf(value), 1);
        else districts.push(value);
      }

      editUserSettings(users, user_id, { districts }).then(() => {
        editMessageText(bot, 'Районы:', chat_id, msg_id, keyboardDistricts(districts));
      })
        .catch((err) => {
          bot.sendMessage(user_id, ERR_SERVER);
          reportError(user_id, err);
        });
    } else if (action.includes('setPrice:')) {
      const { settings: { price } } = user;
      const value = +action.substring('setPrice:'.length);
      if (price !== value) {
        editUserSettings(users, user_id, { price: value }).then(() => {
          user.settings.price = value;
          editMessageText(bot, 'Цена:', chat_id, msg_id, keyboardPrice(user));
        })
          .catch((err) => {
            bot.sendMessage(user_id, ERR_SERVER);
            reportError(user_id, err);
          });
      }
    }
  });
};

const broadcastBotNotify = (bot, { data, message }, env) => {
  const districtId = getDistrictId(data.district);
  const priceValue = typeof data.price === 'number'
    ? data.price
    : data.price?.match(/\d{2,6}/)?.[0];

  if (districtId && priceValue) {
    const targetUsers = env === 'production'
      ? users
        .filter((user) => user.settings.active)
        .filter((user) => user.settings.districts.includes(districtId))
        .filter((user) => getPriceExpression(user.settings.price)?.(priceValue))
      : users
        .filter((user) => +user.userId === 181749991)
        .filter((user) => user.settings.active)
        .filter((user) => user.settings.districts.includes(districtId))
        .filter((user) => getPriceExpression(user.settings.price)?.(priceValue));

    if (targetUsers.length) {
      targetUsers.forEach(({ userId }) => bot.sendMessage(userId, message));
    }
  }
};

module.exports = {
  broadcastBotSetup,
  broadcastBotNotify,
};
