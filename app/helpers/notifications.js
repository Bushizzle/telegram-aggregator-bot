const { WELCOME_CONFIGURATION, WELCOME_START } = require('../constants/messages');

const notifyUser = (userID, bot, message) => bot.sendMessage(userID, message);

const notifyWelcome = (userId, bot) => notifyUser(userId, bot, WELCOME_START);

const notifyConfig = (userId, bot) => notifyUser(userId, bot, WELCOME_CONFIGURATION);

module.exports = {
	notifyWelcome,
	notifyConfig,
}
