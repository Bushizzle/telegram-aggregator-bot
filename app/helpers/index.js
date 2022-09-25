const { Api } = require('telegram');
const { getMessageData, dataToText } = require('../channelAdapters');
const { DISTRICTS } = require('../constants/districts');
const { PRICES } = require('../constants/prices');
const logger = require('log4js').getLogger('logger');

const {
	addUser,
	removeUser,
	findUser,
	editUserSettings,
} = require('./user');

const cutChunks = (sliceSize, array) => {
	let result = [];
	let chunkSize = 2;
	for (let i = 0; i < array.length; i += chunkSize) {
		const chunk = array.slice(i, i + chunkSize);
		result.push(chunk);
	}
	return result;
}

const generateMessageId = (channelId, messageId) => `${channelId}-${messageId}`;

function getMessagesInPeriod(messages, period) {
	const now = Date.now();
	return messages.filter(({ date }) => now - date * 1000 < period);
}

const collectGroupMessages = async (client, groupId, period) => {
	logger.info('start collecting');
	let offset = 0,
		finished = false;
	const resultData = [];
	do {
		const result = await client.invoke(
			new Api.messages.GetHistory({
				peer: `-100${groupId}`,
				limit: 100,
				addOffset: offset * 100,
			})
		);
		const messages = getMessagesInPeriod(result.messages, period);
		resultData.push(...messages);
		logger.info(`iteration ${offset} done with ${messages.length} messages`);
		offset += 1;
		if (messages.length < 100) finished = true;
	} while (!finished);
	return resultData;
}

const getForwardInfo = async (client, channelId, messageId, message) => {
	// const channelInfo = await client.invoke(
	// 	new Api.channels.GetFullChannel({
	// 		channel: channelId, // not working
	// 	})
	// );
	// const link = channelInfo?.fullChat?.exportedInvite?.link
	const { data, config } = getMessageData(message, channelId);
	logger.info(data);
	const replyTest = dataToText(data);

	return data && {
		data,
		// message: `${result}Ссылка: https://t.me/c/${GIGARENT_CHANNEL_TBILISI}/${messageId}`,
		message: `${replyTest}Канал: https://t.me/${config.link}\nОбъявление: https://t.me/c/${channelId}/${messageId}`,
	};
}

const reportError = (id, msg) => {
	logger.error(id, msg);
};

const getDistrictsNames = districts => districts.map(id => DISTRICTS.find(district => district.key === id)?.name);

const getDistrictId = (text) => {
	const district = DISTRICTS.find(d => d.values.includes(text.toLowerCase()));
	return district?.key || 0;
}

const getPriceExpression = (priceKey) => {
	const priceData = PRICES.find(p => p.key === priceKey);
	return priceData?.expression || null;
}

module.exports = {
	cutChunks,
	getDistrictId,
	generateMessageId,
	getMessagesInPeriod,
	collectGroupMessages,
	getForwardInfo,
	reportError,
	addUser,
	removeUser,
	findUser,
	editUserSettings,
	getDistrictsNames,
	getPriceExpression,
};
