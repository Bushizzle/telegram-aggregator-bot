import * as log4js from 'log4js';
import { Storage } from '../storage';

log4js.configure({
  appenders: {
    logs: {
      type: 'file',
      filename: './logs/logfile.log',
    },
    errors: {
      type: 'file',
      filename: './logs/errors.log',
    },
    console: { type: 'console' },
  },
  categories: {
    console: {
      appenders: ['console'],
      level: 'all',
    },
    logs: {
      appenders: ['logs', 'console'],
      level: 'all',
    },
    errors: {
      appenders: ['errors', 'console'],
      level: 'error',
    },
    default: {
      appenders: ['errors', 'console'],
      level: 'all',
    },
  },
});

const log = log4js.getLogger('logs');
const err = log4js.getLogger('errors');
const console = log4js.getLogger('console');

export class Reporter {
  public static mapMessage(messages: any[]) {
    return messages.join('\n');
  }
  public static log(message: any) {
    log.info(message);
  }
  public static console(message: any) {
    console.info(message);
  }
  public static error(messages: any[]) {
    const errorText = `[ERROR]\n${Reporter.mapMessage(messages)}`;
    err.error(errorText);
    Storage.admin && void Storage.bot.sendMessage(Storage.admin, errorText);
  }
  public static admin(message: string) {
    Storage.admin && void Storage.bot.sendMessage(Storage.admin, message);
  }
}
