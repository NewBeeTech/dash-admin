
import { POSTJSON, GET } from '../core/WS/WSHandler';
import * as URL from '../core/WS/URL';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import AsyncFetchHandler from '../core/AsyncFetchHandler';
import NotificationAction from '../common/NotificationAction';
import NotificationCenter from '../common/NotificationCenter';

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
export const addDash = (params: Object) => (dispatch) => {
  const boyNum = params.boyNum;
  const girlNum = params.girlNum;
  params.sexRate = `${boyNum}:${girlNum}`;
  const result = POSTJSON(URL.addDashPath, params);
  AsyncFetchHandler(ADD_DASH, result, dispatch);
  result.then(data => {
    console.log(data);
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '创建成功',
        '',
        'success',
        2,
      );
      dispatch(push(RoutingURL.DashList()));
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
  if(params.boyNum) {
    const boyNum = params.boyNum;
    const girlNum = params.girlNum;
    params.sexRate = `${boyNum}:${girlNum}`;
  }
  const result = POSTJSON(URL.updateDashPath, params);
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
      dispatch(push(RoutingURL.DashList()));
      dispatch(getDashList({pageNum: params.pageNum, pageSize: params.pageSize }));
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
  const result = GET(URL.deleteDashPath, {id: params.id});
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
      dispatch(getDashList({pageNum: params.pageNum, pageSize: params.pageSize }));
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


// 获取activityList
export const GET_ACTIVITYLIST = 'GET_ACTIVITYLIST';
export const getActivityList = (params: Object) => (dispatch) => {
  const result = GET(URL.getActivityListPath, params);
  AsyncFetchHandler(
    GET_ACTIVITYLIST,
    result,
    dispatch
  );
};

// 运营拒绝
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const changeStatus = (params: Object) => (dispatch) => {
  const result = GET(URL.changeActivityStatusPath, params);
  AsyncFetchHandler(
    CHANGE_STATUS,
    result,
    dispatch
  );
  result.then(data => {
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '状态已更改',
        '',
        'success',
        2,
      );
      dispatch(getActivityList({pageNum: params.pageNum, pageSize: params.pageSize }));
    } else {
      NotificationCenter.NotificationCard(
        '操作失败',
        data.message,
        'error',
        3,
      );
    }
  });
};

// 修改报名活动状态
export const CHANGE_ACTIVITYSIGNUP_STATUS = 'CHANGE_ACTIVITYSIGNUP_STATUS';
export const changeActivitySignupStatus = (params: Object) => (dispatch) => {
  const result = GET(URL.changeActivitySignupStatusPath, params);
  AsyncFetchHandler(
    CHANGE_ACTIVITYSIGNUP_STATUS,
    result,
    dispatch
  );
  result.then(data => {
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '状态已更改',
        '',
        'success',
        2,
      );
      dispatch(getDashInfo({ activityId: params.activityId }));
    } else {
      NotificationCenter.NotificationCard(
        '操作失败',
        data.message,
        'error',
        3,
      );
    }
  });
};

// 修改报名活动状态
export const CHANGE_ACTIVITY_TUIKUAN_STATUS = 'CHANGE_ACTIVITYSIGNUP_STATUS';
export const changeActivityTuiKuanStatus = (params: Object) => (dispatch) => {
  const result = GET(URL.changeActivitySignupStatusPath, params);
  AsyncFetchHandler(
    CHANGE_ACTIVITYSIGNUP_STATUS,
    result,
    dispatch
  );
  result.then(data => {
    if (data.code === '001') {
      NotificationCenter.NotificationCard(
        '状态已更改',
        '',
        'success',
        2,
      );
      dispatch(getActivityList({ pageNum: 1, pageSize: 10 }));
    } else {
      NotificationCenter.NotificationCard(
        '操作失败',
        data.message,
        'error',
        3,
      );
    }
  });
};

// 修改订单备注
export const UPDATE_REMARK = 'UPDATE_REMARK';
export const updateRemark = (params: Object) => (dispatch) => {
  const result = GET(URL.updateRemarkPath, params);
  AsyncFetchHandler(
    UPDATE_REMARK,
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
      dispatch(getActivityList({ pageNum: 1, pageSize: 10 }));
    } else {
      NotificationCenter.NotificationCard(
        '修改失败',
        data.message,
        'error',
        3,
      );
    }
  });
};
