
import * as DashAction from '../actions/DashAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  dashList: Immutable.Map({
    // dashListData: Immutable.List([
    //     Immutable.Map({
    //       id: 1,
    //       type: 1, // 活动类型
    //       address: '望京',
    //       photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    //       status: 1, // 活动状态
    //       name: '标题1',
    //       smallTitle: '小标题',
    //       startTime: '', // 活动开始时间
    //       endTime: '', // 活动报名时间
    //       signupStartTime	: '', // 报名开始时间
    //       signupEndTime: '', // 报名报名时间
    //       createTime: '',
    //     }),
    //     Immutable.Map({
    //       id: 2,
    //       type: 1, // 活动类型
    //       address: '望京',
    //       photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    //       status: 1, // 活动状态
    //       title: '标题1',
    //       smallTitle: '小标题',
    //       startTime: '2017-09-23 09:00:00', // 活动开始时间
    //       endTime: '2017-09-23 11:00:00', // 活动报名时间
    //       signupStartTime	: '2017-09-23 09:00:00', // 报名开始时间
    //       signupEndTime: '2017-09-23 09:00:00', // 报名报名时间
    //       createTime: '',
    //     }),
    //   ]),
    //   total: 10,
    //   pageSize: 1,
  }),
  dashInfo: Immutable.Map({
    id: 2,
    type: 1, // 活动类型
    photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    status: 1, // 活动状态
    name: '标题1',
    var3: '小标题',
    startTime: '2017-09-27', // 活动开始时间
    endTime: '2017-09-27', // 活动报名时间
    signupStartTime	: '2017-09-27', // 报名开始时间
    signupEndTime: '2017-09-27', // 报名报名时间
    boyNum: 3,
    girlNum : 3,
    boyMoney: 200,
    girlMoney: 100,
    desc: '活动介绍',
    activityFlow: '',
    tips: '',
    originUserId: '发起人ID',
    originUserDesc: '发起人描述',
    originUserName: '发起人名字',
    originUserImg: '发起人头像',
    signupPeople: Immutable.List([
      Immutable.Map({
        name: '名字1',
        sex: 1,              
      }),
      Immutable.Map({
        name: '名字2',
        sex: 0,              
      }),
      Immutable.Map({
        name: '名字3',
        sex: 1,              
      }),
    ]),
  }),
  searchData: Immutable.Map({
    id: '',
    name: '',
    status: '',
    pageNum: 1,
    pageSize: 10,
  })
});

const getDashListHandler = new ActionHandler.handleAction(DashAction.GET_DASHLIST)
  .success((state, action) => {
    const dashList = [];
    if(action.data.list.length) {
      action.data.list.map((item) => {
        dashList.push({
          id: item.id,
          title: item.name,
          smallTitle: item.var5,
          photos: item.photos,
          address: item.address,
          type: item.type,
          status: item.status,
          startTime: item.startTime,
          endTime: item.endTime,
          signupStartTime: item.signupStartTime,
          signupEndTime: item.signupEndTime,
          createTime: item.createTime,
        })
      })
    }
    return state.setIn(['dashList', 'dashListData'], Immutable.fromJS(dashList))
      .setIn(['dashList', 'total'], Immutable.fromJS(action.data.totalRow))
      .setIn(['dashList', 'pageSize'], Immutable.fromJS(action.data.pageSize))
      .setIn(['searchData', 'pageNum'], Immutable.fromJS(action.data.pageNumber))
      .set('isFetching', false).set('errMsg', '');
  });
  
const getDashInfoHandler = new ActionHandler.handleAction(DashAction.GET_DASHINFO)
    .success((state, action) => {
      return state.set('dashInfo', Immutable.fromJS(action.data))
        .set('isFetching', false).set('errMsg', '');
    });
    
const addDashHandler = new ActionHandler.handleAction(DashAction.ADD_DASH);
const updateDashHandler = new ActionHandler.handleAction(DashAction.UPDATE_DASH);
const deleteDashHandler = new ActionHandler.handleAction(DashAction.DELETE_DASH);


export default ActionHandler.handleActions(
  [getDashListHandler, getDashInfoHandler, addDashHandler, updateDashHandler, deleteDashHandler],
  defaultState,
  /^DashReducer\//
);
