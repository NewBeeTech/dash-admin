
import { POSTJSON } from '../core/WS/WSHandler';
import * as URL from '../core/WS/URL';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import NotificationAction from '../common/NotificationAction';

// action define
export const GET_LOGIN = 'GET_LOGIN';

export const getLOGIN = (params: Object) => (dispatch) => {
  const result = POSTJSON(URL.LoginPath, params);
  AsyncFetchHandler(GET_LOGIN, result, dispatch);
  result.then(data => {
    if (data.code === '001') {
      dispatch(NotificationAction(
        { type: 'SUCCESS',
          device: 'pc',
          title: '登录成功',
          icon: 'smile-circle',
        }));
      dispatch(push(RoutingURL.App()));
    } else {
      dispatch(NotificationAction({ type: 'FAIL', device: 'pc', title: `${data.message}` }));
    }
  }).catch((err) => {
    console.warn('登录 -> 网络请求失败 ', err);
  });
};
