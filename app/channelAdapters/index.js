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
} = require('../helpers/channelMessages');

const adapterByKeys = (message, config) => {
	return config?.keys?.length ? mapStrings(message).reduce((res, str) => {
		const keyPair = getKeypair(config, str);
		if (keyPair) res[keyPair.key] = removeGarbage(getValue(str, keyPair.value));
		return res;
	}, {}) : [];
};

const adapterByMarkers = (message, config) => {
	return config?.markers?.length ? mapStrings(message).reduce((res, str) => {
		const marker = config.markers.find(({matches, exceptions}) =>
			matches.some(val => {
				return str.match(val) && (!exceptions || !haveExceptions(str, exceptions));
			})
		);
		if (marker) res[marker.key] = removeGarbage(str);
		return res;
	}, {}) : [];
};

const getMessageData = (message, channelId) => {
	const config = getConfig(channelId, configs);
	if (haveExceptions(message, config)) return false;
	const result = {
		...adapterByKeys(message, config),
		...adapterByMarkers(message, config),
	}
	const district = getDistrict(message, DISTRICTS);
	if (district) result.district = district.name;

	result.link = config.link;
	return result;
};

const dataToText = (result) => {
	let text = '';
	for (let key in result) {
		text += `${DICTIONARY[key]}: ${result[key]}\n`;
	}
	return text;
};

module.exports = { getMessageData, dataToText };
