/**
 * Created by wl on 16/7/11.
 * @flow
 */

export const PrefixURL = (): string => '/';
export const Login = (): string => '/Login';
export const App = (): string => '/App';

export const prefix = (prefixs: string): string => `${PrefixURL()}${prefixs}`;

/* **************************  工作室管理模块  ******************************************** */
export const Shouye = (): string => prefix('Shouye');
