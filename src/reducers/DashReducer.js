
import * as DashAction from '../actions/DashAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;
// 添加活动、活动id（可筛选）、活动类型、活动图片上传、上线/下线（可筛选）、标题（可筛选）、
// 副标题、
// 活动信息（活动时间、地点、人数、费用、活动流程、友情提示）、
// 活动详情、报名用户、
// 可标记为“问题订单”（可筛选）（问题订单为需要运营人员手动处理的订单）、）、编辑（活动一经发布无法再次编辑）、
// 查看、删除、抓取橄榄枝匹配的用户，
// 发起人（名称、默认头像、上传头像和详情介绍）。
const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  dashList: Immutable.Map({
    dashListData: Immutable.List([
        Immutable.Map({
          id: 1,
          type: 1, // 活动类型
          address: '望京',
          photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
          status: 1, // 活动状态
          title: '标题1',
          smallTitle: '小标题',
          startTime: '', // 活动开始时间
          endTime: '', // 活动报名时间
          signupStartTime	: '', // 报名开始时间
          signupEndTime: '', // 报名报名时间
          originUserName: '发起人名字',
          originUserImg: '发起人头像',
        }),
        Immutable.Map({
          id: 2,
          type: 1, // 活动类型
          address: '望京',
          photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
          status: 1, // 活动状态
          title: '标题1',
          smallTitle: '小标题',
          startTime: '2017-09-23 09:00:00', // 活动开始时间
          endTime: '2017-09-23 11:00:00', // 活动报名时间
          signupStartTime	: '2017-09-23 09:00:00', // 报名开始时间
          signupEndTime: '2017-09-23 09:00:00', // 报名报名时间
          originUserName: '发起人名字',
          originUserImg: '发起人头像',
        }),
      ]),
      total: 10,
      currentPage: 1,
  }),
  dashInfo: Immutable.Map({
    id: 2,
    type: 1, // 活动类型
    photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    status: 1, // 活动状态
    title: '标题1',
    smallTitle: '小标题',
    startTime: '2017-09-27', // 活动开始时间
    endTime: '2017-09-27', // 活动报名时间
    signupStartTime	: '2017-09-27', // 报名开始时间
    signupEndTime: '2017-09-27', // 报名报名时间
    boyNum: 3,
    girlNum : 3,
    boyMoney: 200,
    girlMoney: 100,
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
    title: '',
    status: '',
    page: 1,
  })
});

const getDashListHandler = new ActionHandler.handleAction(DashAction.GET_DASHLIST)
  .success((state, action) => {
    return state.set('dashList', Immutable.fromJS(action.data))
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
