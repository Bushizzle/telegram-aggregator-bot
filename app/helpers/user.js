const fetch = require('node-fetch');
const { USERS_LAMBDA } = require('../constants');
const { SUCCESS_SUBSCRIBE, ERR_DUPLICATE, SUCCESS_UNSUBSCRIBE, ERR_NOT_SUBSCRIBED, ERR_NO_USER } = require('../constants/messages');

const findUser = (users, id) => users.find(({userId}) => userId === id);

const newUser = (userId, name, userName) => ({
	userId,
	name,
	userName,
	filters: {
		price: 6,
		districts: [],
	}
});

const addUser = async (users, userId, name, userName) => {
	return new Promise((resolve, reject) => {
		if (!findUser(users, userId)) {
			const user = newUser(userId, name, userName);
			return fetch(USERS_LAMBDA, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(user),
			})
				.then(res => res.json())
				.then(result => {
					users.push(user);
					resolve({result, status: 'OK', message: SUCCESS_SUBSCRIBE});
				})
				.catch(err => reject(err));
		} else {
			resolve({status: 'ERR', message: ERR_DUPLICATE});
		}
	});
}

const editUser = async (users, userId, filters) => {
	return new Promise((resolve, reject) => {
		const user = findUser(users, userId);
		if (user) {
			const modifiedUser = {
				...user,
				filters: {
					...user.filters,
					...filters,
				},
			};
			console.log(modifiedUser);
			return fetch(USERS_LAMBDA, {
				method: 'PUT',
				mode: 'cors',
				body: JSON.stringify(modifiedUser),
			})
				.then(res => res.json())
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
		if (findUser(users, userId)) {
			return fetch(USERS_LAMBDA, {
				method: 'DELETE',
				mode: 'cors',
				body: JSON.stringify({userId}),
			})
				.then(res => res.json())
				.then(result => {
					users.splice(users.findIndex(user => user.userId === userId), 1);
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
	editUser,
	removeUser,
};
