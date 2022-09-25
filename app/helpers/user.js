const fetch = require('node-fetch');
const { USERS_LAMBDA } = require('../constants');
const { SUCCESS_SUBSCRIBE, ERR_DUPLICATE, SUCCESS_UNSUBSCRIBE, ERR_NOT_SUBSCRIBED, ERR_NO_USER } = require('../constants/messages');
const { ALL_DISTRICTS_KEYS } = require('../constants/districts');

const findUser = (users, id) => users.find(({userId}) => userId === id);

const newUser = (userId, name, userName) => ({
	userId,
	name,
	userName,
	settings: {
		price: 6,
		districts: ALL_DISTRICTS_KEYS,
		active: true,
	},
	notifications: {
		welcome: true,
		config: false,
	}
});

const sendToLambda = (method, data) => fetch(USERS_LAMBDA, {
	method: method,
	mode: 'cors',
	body: JSON.stringify(data),
})
	.then(res => res.json());

const addUser = async (users, userId, name, userName) => {
	return new Promise((resolve, reject) => {
		const user = findUser(users, userId);
		if (!user) {
			const createdUser = newUser(userId, name, userName);
			return sendToLambda('POST', createdUser)
				.then(result => {
					users.push(createdUser);
					resolve({result, status: 'OK', message: SUCCESS_SUBSCRIBE, welcomed: false});
				})
				.catch(err => reject(err));
		} else if (!user?.settings.active) {
			const modifiedUser = {
				...user,
				settings: {
					...user.settings,
					active: true,
				},
				notifications: user?.notifications ? {
					...user.notifications,
					welcome: true,
				} : {
					welcome: true,
					config: false,
				}
			};
			sendToLambda('PUT', modifiedUser)
				.then(result => {
					users.splice(users.indexOf(user), 1, modifiedUser);
					resolve({result, status: 'OK', message: SUCCESS_SUBSCRIBE, welcomed: user?.notifications?.welcome});
				})
		} else {
			resolve({status: 'ERR', message: ERR_DUPLICATE, welcomed: true});
		}
	});
}

const editUserSettings = async (users, userId, settings) => {
	return new Promise((resolve, reject) => {
		const user = findUser(users, userId);
		if (user?.settings.active) {
			const modifiedUser = {
				...user,
				settings: {
					...user.settings,
					...settings,
				},
				notifications: user?.notifications ? {
					...user.notifications,
					config: true,
				} : {
					config: true,
					welcome: false,
				},
			};
			return sendToLambda('PUT', modifiedUser)
				.then(result => {
					users.splice(users.indexOf(user), 1, modifiedUser);
					resolve({result, status: 'OK'});
				})
				.catch(err => reject(err));
		} else {
			resolve({status: 'ERR', message: ERR_NO_USER});
		}
	});
}

const removeUser = async (users, userId) => {
	return new Promise((resolve, reject) => {
		const user = findUser(users, userId);
		const modifiedUser = {
			...user,
			settings: {
				...user.settings,
				active: false,
			},
		};
		if (user?.settings.active) {
			return sendToLambda('PUT', modifiedUser)
				.then(result => {
					users.splice(users.indexOf(user), 1, modifiedUser);
					resolve({result, status: 'OK', message: SUCCESS_UNSUBSCRIBE});
				})
				.catch(err => reject(err));
		} else {
			resolve({status: 'ERR', message: ERR_NOT_SUBSCRIBED});
		}
	});
}

module.exports = {
	findUser,
	addUser,
	editUserSettings,
	removeUser,
};
