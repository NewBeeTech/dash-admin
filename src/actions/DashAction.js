
import { POSTJSON, GET } from '../core/WS/WSHandler';
import * as URL from '../core/WS/URL';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import NotificationAction from '../common/NotificationAction';

// 获取bannerList
export const GET_BANNERLIST = 'GET_BANNERLIST';
export const getBannerList = (params: Object) => (dispatch) => {
  const result = GET(URL.getBannerListPath, params);
  AsyncFetchHandler(
    GET_BANNERLIST,
    result,
    dispatch
  );
};

// 获取bannerInfo
export const GET_BANNERINFO = 'GET_BANNERINFO';
export const getBannerInfo = (params: Object) => (dispatch) => {
  const result = GET(URL.getBannerInfoPath, params);
  AsyncFetchHandler(
    GET_BANNERINFO,
    result,
    dispatch
  );
};


// 添加banner
export const ADD_BANNER = 'ADD_BANNER';
export const addBannerInfo = (params: Object) => (dispatch) => {
  const result = GET(URL.addBannerPath, params);
  AsyncFetchHandler(ADD_BANNER, result, dispatch);
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
        '请填写正确的Banner信息',
        'error',
        3,
      );
    }
  });
};


// 修改banner
export const UPDATE_BANNER = 'UPDATE_BANNER';
export const updateBanner = (params: Object) => (dispatch) => {
  const result = GET(URL.updateBannerPath, params);
  AsyncFetchHandler(
    UPDATE_BANNER,
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
        '请填写正确的Banner信息',
        'error',
        3,
      );
    }
  });
};


// 删除banner
export const DELETE_BANNER = 'DELETE_BANNER';
export const deleteBanner = (params: Object) => (dispatch) => {
  const result = GET(URL.deleteBannerPath, params);
  AsyncFetchHandler(
    DELETE_BANNER,
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