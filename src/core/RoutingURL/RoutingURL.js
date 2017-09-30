/**
 * Created by wl on 16/7/11.
 * @flow
 */

export const PrefixURL = (): string => '/';
export const Login = (): string => '/Login';
export const App = (): string => '/App';

export const prefix = (prefixs: string): string => `${PrefixURL()}${prefixs}`;

/* **************************  banner管理模块  ******************************************** */
export const BannerList = (): string => prefix('banner-list');

export const Banner = (id : string = '', editing : boolean = false): string => {
  if (editing) {
    return prefix(`banner/${id}?editing=true`);
  }
  return prefix(`banner/${id}`);
};
/* **************************  活动管理模块  ******************************************** */
export const DashList = (): string => prefix('dash-list');

export const ActivityList = ():string =>  prefix('activity-list');

export const DashInfo = (id : string = '', editing : boolean = false): string => {
  if (editing) {
    return prefix(`dash/${id}?editing=true`);
  }
  return prefix(`dash/${id}`);
};
/* **************************  用户管理模块  ******************************************** */
export const UserList = (): string => prefix('user-list');

export const UserInfo = (id : string = '', editing : boolean = false): string => {
  if (editing) {
    return prefix(`user/${id}?editing=true`);
  }
  return prefix(`user/${id}`);
};