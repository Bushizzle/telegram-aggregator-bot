const { USERS_LAMBDA } = require('./constants');
const {
    K_MAIN,
    K_DISTRICT,
    K_PRICE,
    mapDistrictsKeyboard,
    mapPriceKeyboard,
} = require('./constants/keyboadrs');
const fetch = require('node-fetch');

const {
    ERR_SERVER,
} = require('./constants/messages');

const {
    addUser,
    editUser,
    removeUser,
    findUser,
    getDistrictsNames,
    getDistrictId,
    getPriceExpression,
} = require('./helpers');

const users = [];

fetch(USERS_LAMBDA)
    .then(res => res.json())
    .then(({Items}) => users.push(...Items))
    .then(_ => console.log(users));

const editMessageText = (bot, reply_text, chat_id, message_id, inline_keyboard) => bot.editMessageText(reply_text, {
    chat_id,
    message_id,
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard,
    }
});

const broadcastBotSetup = (bot, client) => {
  bot.on('message', async (msg) => {
    const { chat, from, text } = msg;

    // console.log(chat, from, text);

    if (text === '/start') {
      addUser(users, from.id, from.first_name, from.username)
          .then(({message}) => {
              bot.sendMessage(from.id, message);
          })
          .catch(err => {
              bot.sendMessage(from.id, ERR_SERVER);
              reportError(from.id, err);
          });
    } else if (text === '/stop') {
        removeUser(users, from.id)
            .then(({message}) => {
                bot.sendMessage(from.id, message);
            })
            .catch(err => {
                bot.sendMessage(from.id, ERR_SERVER);
                reportError(from.id, err);
            });
    } else if (text === '/set') {
        bot.sendMessage(msg.from.id, 'Настройки', {
            reply_markup: {
                inline_keyboard: K_MAIN,
            }
        });
    }
  });

  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
        const user_id = callbackQuery.from.id;
        const action = callbackQuery.data;
        const msg_id = callbackQuery.message.message_id;
        const chat_id = callbackQuery.from.id;

        const user = findUser(users, user_id);

        if (action === 'return_to_main') {
            editMessageText(bot, 'Настройки', chat_id, msg_id, K_MAIN);
        }
        else if (action === 'district') {
            editMessageText(bot, `Районы: ${getDistrictsNames(user.filters.districts)}`, chat_id, msg_id, mapDistrictsKeyboard(user));
        }
        else if (action === 'price') {
            editMessageText(bot, 'Цена', chat_id, msg_id, mapPriceKeyboard(user));
        }
        else if (action.includes('setDistrict:')) {
            const { filters: { districts } } = user;
            const value = +action.substring('setDistrict:'.length);

            editUser(users, user_id, { districts }).then(() => {
                    if (districts.includes(value)) districts.splice(districts.indexOf(value), 1);
                    else districts.push(value);
                    editMessageText(bot, `Районы:`, chat_id, msg_id, mapDistrictsKeyboard(user));
                })
                .catch(err => {
                    bot.sendMessage(user_id, ERR_SERVER);
                    reportError(user_id, err);
                });
        }
        else if (action.includes('setPrice:')) {
            const { filters: { price } } = user;
            const value = +action.substring('setPrice:'.length);
            if (price !== value) {
                editUser(users, user_id, { price: value }).then(() => {
                    user.filters.price = value;
                    editMessageText(bot, `Цена:`, chat_id, msg_id, mapPriceKeyboard(user));
                })
                    .catch(err => {
                        bot.sendMessage(user_id, ERR_SERVER);
                        reportError(user_id, err);
                    });
            }


        }
    });
}

const broadcastBotNotify = (bot, { data, message }) => {
    const districtId = getDistrictId(data.district);
    const priceValue = typeof data.price === 'number'
        ? data.price
        : data.price?.match(/\d{2,6}/)?.[0];

    if (districtId && priceValue) {
        const targetUsers = users
            .filter(user => user.filters.districts.includes(districtId))
            .filter(user => getPriceExpression(user.filters.price)?.(priceValue));

        if (targetUsers.length) {
            targetUsers.forEach(({userId}) => bot.sendMessage(userId, message));
        }
    }
};

const reportError = (id, msg) => {
    console.log('Custom error:');
    console.log(id, msg);
};

module.exports = {
    broadcastBotSetup,
    broadcastBotNotify,
}
