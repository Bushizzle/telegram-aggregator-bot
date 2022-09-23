const { REGEXP } = require('../constants/regexp');

const removeGarbage = (str, key) => {
	if (key === 'contacts') return str;
	return str
		.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
		.replace(/[\u200B\u200C\u200D\uFEFF\u2028\u2029\uFE0F]/g, '').trim();
}

const mapStrings = (str, divider) => str.split(divider || '\n');

const getValue = (str, substr) => str.substring(substr.length + str.toLowerCase().indexOf(substr)).trim().replace(/[!@#$%^&*]/g, "");

const getKeypair = (config, str) => {
	const keyConfig = config.keys.find((key) => key.matches.find(
		(val) => str.toLowerCase().includes(val.toLowerCase())
	));
	const value = keyConfig?.matches.find(val => str.toLowerCase().includes(val.toLowerCase()));
	return keyConfig && { key: keyConfig.key, value };
};

const haveExceptions = (message, config) => config?.exceptions?.some((val) => message.toLowerCase().includes(val.toLowerCase()));

const getDistrict = (message, districts) => districts.find(d =>
	d.values.some(val => message.toLowerCase().match(REGEXP.make.district(val.toLowerCase())))
);

const getConfig = (id, configs) => configs.find(conf => conf.id === id);

const isDistrict = (str, districts) =>
	districts.find(el => el.values.some(val => str.trim().toLowerCase() === val.trim().toLowerCase()))

module.exports = {
	removeGarbage,
	mapStrings,
	getValue,
	getKeypair,
	haveExceptions,
	getDistrict,
	getConfig,
	isDistrict,
};
