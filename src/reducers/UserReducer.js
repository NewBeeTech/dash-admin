
import * as UserAction from '../actions/UserAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  userList: Immutable.Map({
    // userListData: Immutable.List([
    //     Immutable.Map({
    //       id: 1,
    //       wxPortrait: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    //       wxAccount: 'fdfss',
    //       wxName: 'nickName',
    //       age: 27,
    //       sex: 1,
    //       status: 1, // 0冻结  1正常
    //       likeCount: 10, //收到橄榄枝数量
    //       phone: 1034923482,
    //       tags: '爱好1,爱好2,爱好3',
    //     }),
    //     Immutable.Map({
    //       id: 2,
    //       wxPortrait: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    //       wxAccount: 'fdfss',
    //       wxName: 'nickName',
    //       age: 27,
    //       sex: 1,
    //       status: 1, // 0冻结  1正常
    //       likeCount: 10, //收到橄榄枝数量
    //       phone: 1034923482,
    //       tags: '爱好1,爱好2,爱好3',
    //     }),
    //   ]),
    //   total: 10,
    //   currentPage: 1,
  }),
  userInfo: Immutable.Map({
    // id: 1,
    // wxPortrait: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    // wxAccount: 'fdfss',
    // wxName: 'nickName',
    // userName: '',
    // age: 27,
    // sex: 1,
    // status: 1, // 0冻结  1正常
    // likeCount: 10, //收到橄榄枝数量
    // phone: 1034923482,
    // tags: '爱好1,爱好2,爱好3',
    // photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png,https://img.shaka.hsohealth.com/avatar/20170301_free.png,https://img.shaka.hsohealth.com/avatar/20170301_free.png', // 上传的照片
    // boyInfo: Immutable.Map({
    //     height: '160',
    //     profession: '互联网',
    //     position: 'leader', // 职位
    //     home: '北京', // 家乡
    //     income: '100k', // 收入
    //     specialty: '可爱 会做饭', // 特长
    // }),
    // dashList: Immutable.List([
    //   Immutable.Map({
    //     id: 1,
    //     type: 1, // 活动类型
    //     address: '望京',
    //     photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    //     status: 1, // 活动状态
    //     name: '标题1',
    //     smallTitle: '小标题',
    //     startTime: '', // 活动开始时间
    //     endTime: '', // 活动报名时间
    //     signupStartTime	: '', // 报名开始时间
    //     signupEndTime: '', // 报名报名时间
    //     createTime: '',
    //   }),
    //   Immutable.Map({
    //     id: 2,
    //     type: 1, // 活动类型
    //     address: '望京',
    //     photos: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    //     status: 1, // 活动状态
    //     title: '标题1',
    //     smallTitle: '小标题',
    //     startTime: '2017-09-23 09:00:00', // 活动开始时间
    //     endTime: '2017-09-23 11:00:00', // 活动报名时间
    //     signupStartTime	: '2017-09-23 09:00:00', // 报名开始时间
    //     signupEndTime: '2017-09-23 09:00:00', // 报名报名时间
    //     createTime: '',
    //   }),
    // ]),
  }),
  searchData: Immutable.Map({
    id: '',
    sex: '',
    pageNum: 1,
    pageSize: 10,
  })
});

const getUserListHandler = new ActionHandler.handleAction(UserAction.GET_USERLIST)
  .success((state, action) => {
    return state.setIn(['userList', 'userListData'], Immutable.fromJS(action.data.list))
      .setIn(['userList', 'total'], Immutable.fromJS(action.data.totalRow))
      .setIn(['searchData', 'pageSize'], Immutable.fromJS(action.data.pageSize))
      .setIn(['searchData', 'pageNum'], Immutable.fromJS(action.data.pageNumber))
      .set('isFetching', false).set('errMsg', '');
  });
  
const getUserInfoHandler = new ActionHandler.handleAction(UserAction.GET_USERINFO)
    .success((state, action) => {
      return state.set('userInfo', Immutable.fromJS(action.data))
        .set('isFetching', false).set('errMsg', '');
    });
    
const updateUserHandler = new ActionHandler.handleAction(UserAction.UPDATE_USER);


export default ActionHandler.handleActions(
  [getUserListHandler, getUserInfoHandler, updateUserHandler],
  defaultState,
  /^UserReducer\//
);
