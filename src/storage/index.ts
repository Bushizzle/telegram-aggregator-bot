// @ts-no-check

import { LocalStorage } from 'node-localstorage';
import { TUser } from '../types';

export class Storage {
  public static init = () => (global.storage = new LocalStorage('./scratch'));
  public static setUsers = (users: TUser[]): void => global.storage.setItem('users', JSON.stringify(users));
  public static getUsers = (): TUser[] => JSON.parse(global.storage.getItem('users') as string) as TUser[];
  public static setUsersLambda = (usersLambda: string): void => global.storage.setItem('usersLambda', usersLambda);
  public static getUsersLambda = (): string => global.storage.getItem('usersLambda') as string;
  public static setChannels = (channels: number[]) => global.storage.setItem('channels', JSON.stringify(channels));
  public static getChannels = (): number[] => JSON.parse(global.storage.getItem('channels') as string) as number[];
}
