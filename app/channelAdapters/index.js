const { DISTRICTS, DICTIONARY } = require('../constants/districts');
const configs = require('./config');
const mock = require('./mocks');

const {
	removeGarbage,
	mapStrings,
	getValue,
	getKeypair,
	haveExceptions,
	getDistrict,
	getConfig,
	isDistrict,
} = require('./helpers');

const adapterByKeys = (message, config) => {
	return mapStrings(message).reduce((res, str) => {
		const keyPair = getKeypair(config, str);
		if (keyPair) res[keyPair.key] = removeGarbage(getValue(str, keyPair.value));
		return res;
	}, {});
};

const adapterByMarkers = (message, config) => {
	return mapStrings(message).reduce((res, str) => {
		const marker = config.markers.find(({matches, exceptions}) =>
			matches.some(val => {
				return str.match(val) && (!exceptions || !haveExceptions(str, exceptions));
			})
		);
		if (marker) res[marker.key] = removeGarbage(str);
		return res;
	}, {});
};

const adapters = {
	// АРЕНДА ЖИЛЬЯ 🇬🇪 ГРУЗИЯ 1148878384
	1148878384: (message) => {
		const config = getConfig(1148878384, configs);
		if (haveExceptions(message, config)) return false;
		const result = adapterByKeys(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	// Тбилиси Объявления, Недвижимость, Аренда 1377602081
	1377602081: (message) => {
		const config = getConfig(1377602081, configs);
		if (haveExceptions(message, config)) return false;
		const result = {
			...adapterByKeys(message, config),
			...adapterByMarkers(message, config),
		}
		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;
		return result;
	},
	// Tbilisi apartment rent 1751740207
	1751740207: (message) => {
		const config = getConfig(1751740207, configs);
		if (haveExceptions(message, config)) return false;
		const result = adapterByKeys(message, config);
		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	// Аренда квартир Тбилиси 1513001857
	1513001857: (message) => {
		const config = getConfig(1513001857, configs);
		if (haveExceptions(message, config)) return false;

		const result = {
			...adapterByKeys(message, config),
			...adapterByMarkers(message, config),
		};

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		const address = mapStrings(message)[0];
		if (address && !isDistrict(address, DISTRICTS)) result.address = address;

		const geo = mapStrings(message)[1];
		if (geo.includes('https://')) result.geo = geo;

		return result;
	},
	// 🏡 Тбилиси Аренда покупка недвижимости Квартиры дома 🔑 1170680593
	1170680593: (message) => {
		const config = getConfig(1170680593, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		const address = mapStrings(message)[1].trim();
		if (address && !isDistrict(address, DISTRICTS)) result.address = address;

		return result;
	},
	// АРЕНДА ТБИЛИСИ🏚 1748218743
	1748218743: (message) => {
		const config = getConfig(1748218743, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		const address = mapStrings(message)[0].trim();
		if (address && !isDistrict(address, DISTRICTS)) result.address = address;

		return result;
	},
	// Тбилиси 🏡 Аренда | Продажа | Недвижимость | Жилье | Квартиры 1356271391
	1356271391: (message) => {
		const config = getConfig(1748218743, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	1568042374: (message) => {
		const config = getConfig(1748218743, configs);
		if (haveExceptions(message, config)) return false;

		const result = adapterByMarkers(message, config);

		const district = getDistrict(message, DISTRICTS);
		if (district) result.district = district.name;

		return result;
	},
	translate: (result) => {
		let text = '';
		for (let key in result) {
			text += `${DICTIONARY[key]}: ${result[key]}\n`;
		}
		return text;
	}
}

// const testMock = (id) => mock[id].forEach(adapters[id]);

module.exports = adapters;
