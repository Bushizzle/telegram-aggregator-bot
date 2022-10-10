import { WELCOME_CONFIGURATION, WELCOME_START } from '../constants';
import { Storage } from '../storage';

export const notifyUser = (userID: number, message: string) => Storage.bot.sendMessage(userID, message);

export const notifyWelcome = (userId: number) => notifyUser(userId, WELCOME_START);

export const notifyConfig = (userId: number) => notifyUser(userId, WELCOME_CONFIGURATION);
