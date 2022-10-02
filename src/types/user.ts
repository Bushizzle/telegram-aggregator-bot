export type TUserSettings = {
  price: number;
  districts: any[];
  active: boolean;
};

export type TUserNotifications = {
  welcome: boolean;
  config: boolean;
};

export type TUser = {
  userId: number;
  name: string;
  userName: string;
  settings: TUserSettings;
  notifications: TUserNotifications;
};
