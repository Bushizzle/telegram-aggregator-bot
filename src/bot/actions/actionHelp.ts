import { MSG_ABOUT } from '../../constants';

export const botHelp = (id: number) => void global.bot.sendMessage(id, MSG_ABOUT);
