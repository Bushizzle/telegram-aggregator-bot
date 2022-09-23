const { Api } = require('telegram');
const { getMessageData, dataToText } = require('../channelAdapters');
const { DISTRICTS } = require('../constants/districts');
const { PRICES } = require('../constants/prices');
const { CHANNELS } = require('../constants/channels');

const {
	addUser,
	removeUser,
	findUser,
	editUser,
} = require('./user');

const { GIGARENT_CHANNEL_TBILISI } = require('../constants/channels');

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

// const message = {
// 	CONSTRUCTOR_ID: 1656358105,
// 	SUBCLASS_OF_ID: 2676568142,
// 	className: 'UpdateNewChannelMessage',
// 	classType: 'constructor',
// 	message: {
// 		CONSTRUCTOR_ID: 940666592,
// 		SUBCLASS_OF_ID: 2030045667,
// 		className: 'Message',
// 		classType: 'constructor',
// 		out: false,
// 		mentioned: false,
// 		mediaUnread: false,
// 		silent: false,
// 		post: true,
// 		fromScheduled: false,
// 		legacy: false,
// 		editHide: false,
// 		ttlPeriod: null,
// 		id: 8953,
// 		fromId: null,
// 		peerId: {
// 			CONSTRUCTOR_ID: 2728736542,
// 			SUBCLASS_OF_ID: 47470215,
// 			className: 'PeerChannel',
// 			classType: 'constructor',
// 			channelId: [Integer]
// 		},
// 		fwdFrom: null,
// 		viaBotId: null,
// 		replyTo: null,
// 		date: 1654984351,
// 		message: '',
// 		media: {
// 			CONSTRUCTOR_ID: 1766936791,
// 			SUBCLASS_OF_ID: 1198308914,
// 			className: 'MessageMediaPhoto',
// 			classType: 'constructor',
// 			flags: 1,
// 			photo: [Object],
// 			ttlSeconds: null
// 		},
// 		replyMarkup: null,
// 		entities: null,
// 		views: 1,
// 		forwards: 0,
// 		replies: null,
// 		editDate: null,
// 		pinned: false,
// 		postAuthor: null,
// 		groupedId: { value: 13239874810309226n },
// 		restrictionReason: null,
// 		action: undefined,
// 		noforwards: false,
// 		reactions: null,
// 		flags: 148992
// 	},
// 	pts: 10427,
// 	ptsCount: 1
// }

function getMessagesInPeriod(messages, period) {
	const now = Date.now();
	return messages.filter(({ date }) => now - date * 1000 < period);
}

const collectGroupMessages = async (client, groupId, period) => {
	console.log('start collecting');
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
		console.log(`iteration ${offset} done with ${messages.length} messages`);
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
	const data = getMessageData(message, channelId);
	const replyTest = dataToText(data);

	return !!Object.keys(data).length && {
		data,
		// message: `${result}Ссылка: https://t.me/c/${GIGARENT_CHANNEL_TBILISI}/${messageId}`,
		message: `${replyTest}Канал: https://t.me/${data.link}\nОбъявление: https://t.me/c/${channelId}/${messageId}`,
	};
}

const reportError = (id, msg) => {
	console.log(id, msg);
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

const allDistrictsKeys = () => DISTRICTS.map(d => d.key);

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
	editUser,
	getDistrictsNames,
	getPriceExpression,
	allDistrictsKeys,
};
