import { MSG_ABOUT } from '../../constants';
import { Storage } from '../../storage';

export const botHelp = (id: number) => void Storage.bot.sendMessage(id, MSG_ABOUT);
