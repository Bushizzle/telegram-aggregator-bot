import { TAptData, TUser } from '../../types';
import { getDistrictId, getPrice } from '../../helpers';
import { filtersConfig } from './filtersConfig';

export const usersFilter = (users: TUser[], data: TAptData): TUser[] => {
  const districtId = data?.district && getDistrictId(data.district as string);
  const priceValue = (data?.price as string)?.match(/\d{2,6}/)?.[0];

  return users.filter(({ settings }) => {
    if (!settings.active) return false;
    let flag = true;

    if (flag) {
      flag = settings.districts.includes(districtId) || (!filtersConfig.district.required && !districtId);
    }
    if (flag) {
      flag =
        !!getPrice(settings.price)?.expression(Number(priceValue)) || (!filtersConfig.price.required && !priceValue);
    }

    return flag;
  });
};
