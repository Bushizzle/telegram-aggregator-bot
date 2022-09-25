const { DISTRICTS, DICTIONARY } = require('../constants/districts');
const configs = require('./config');

const {
	removeGarbage,
	mapStrings,
	getValue,
	getKeypair,
	haveExceptions,
	getDistrict,
	getConfig,
	isDistrict,
	sortObjectKeys,
} = require('../helpers/channelMessages');

const adapterByKeys = (message, config) => {
	return config?.keys?.length ? mapStrings(message).reduce((res, str) => {
		const keyPair = getKeypair(config, str);
		if (keyPair) res[keyPair.key] = removeGarbage(getValue(str, keyPair.value), keyPair.key);
		return res;
	}, {}) : {};
};

const adapterByMarkers = (message, config) => {
	return config?.markers?.length ? mapStrings(message).reduce((res, str) => {
		const marker = config.markers.find(({matches, exceptions}) =>
			matches.some(val => {
				return str.match(val) && (!exceptions || !haveExceptions(str, exceptions));
			})
		);
		if (marker) res[marker.key] = removeGarbage(str, marker.key);
		return res;
	}, {}) : {};
};

const getMessageData = (message, channelId) => {
	const config = getConfig(channelId, configs);
	if (haveExceptions(message, config)) return false;
	const data = {
		...adapterByKeys(message, config),
		...adapterByMarkers(message, config),
	}
	const district = getDistrict(message, DISTRICTS);
	if (district) data.district = district.name;

	return {
		data: sortObjectKeys(data),
		config,
	};
};

const dataToText = (data) => {
	let text = '';
	for (let key in data) {
		text += `${DICTIONARY[key]}: ${data[key]}\n`;
	}
	return text;
};

module.exports = { getMessageData, dataToText };
