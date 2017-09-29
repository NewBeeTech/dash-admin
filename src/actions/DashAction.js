
import { POSTJSON, GET } from '../core/WS/WSHandler';
import * as URL from '../core/WS/URL';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import NotificationAction from '../common/NotificationAction';

// 获取dashList
export const GET_DASHLIST = 'GET_DASHLIST';
export const getDashList = (params: Object) => (dispatch) => {
  const result = GET(URL.getDashListPath, params);
  AsyncFetchHandler(
    GET_DASHLIST,
    result,
    dispatch
  );
};

// 获取dashInfo
export const GET_DASHINFO = 'GET_DASHINFO';
export const getDashInfo = (params: Object) => (dispatch) => {
  const result = GET(URL.getDashInfoPath, params);
  AsyncFetchHandler(
    GET_DASHINFO,
    result,
    dispatch
  );
};


// 添加dash
export const ADD_DASH = 'ADD_DASH';
export const addDashInfo = (params: Object) => (dispatch) => {
  const result = GET(URL.addDashPath, params);
  AsyncFetchHandler(ADD_DASH, result, dispatch);
  result.then(data => {
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '创建成功',
        '',
        'success',
        2,
      );
      dispatch(push(RoutingURL.BannerList()));
    } else {
      NotificationCenter.NotificationCard(
        '创建失败',
        '请填写正确的活动信息',
        'error',
        3,
      );
    }
  });
};


// 修改dash
export const UPDATE_DASH = 'UPDATE_DASH';
export const updateDash = (params: Object) => (dispatch) => {
  const result = GET(URL.updateDashPath, params);
  AsyncFetchHandler(
    UPDATE_DASH,
    result,
    dispatch
  );
  result.then(data => {
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '修改成功',
        '',
        'success',
        2,
      );
      dispatch(push(RoutingURL.BannerList()));
    } else {
      NotificationCenter.NotificationCard(
        '修改失败',
        '请填写正确的活动信息',
        'error',
        3,
      );
    }
  });
};


// 删除活动
export const DELETE_DASH = 'DELETE_DASH';
export const deleteDash = (params: Object) => (dispatch) => {
  const result = GET(URL.deleteDashPath, params);
  AsyncFetchHandler(
    DELETE_DASH,
    result,
    dispatch
  );
  result.then(data => {
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '删除成功',
        '',
        'success',
        2,
      );
      dispatch(getDashList());
    } else {
      NotificationCenter.NotificationCard(
        '删除失败',
        data.message,
        'error',
        3,
      );
    }
  });
};