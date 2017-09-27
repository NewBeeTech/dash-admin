
import * as UserAction from '../actions/UserAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;
// 用户id（可筛选）、用户昵称、用户微信头像、用户上传的个人图片、年龄、性别（可筛选）、
// 男性别（身高、职业、职位、家乡、收入、特长）、查看、编辑、屏蔽、收到橄榄枝数量、
// 相关活动（想去、参加过的、取消报名）、手机号、标签。
const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  userList: Immutable.Map({
    userListData: Immutable.List([
        Immutable.Map({
          id: 1,
          portrait: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
          nickName: 'nickName',
          age: 27,
          sex: 1,
          status: 1, // 0冻结  1正常
          likeCount: 10, //收到橄榄枝数量
          phone: 1034923482,
          tags: '爱好1,爱好2,爱好3',
        }),
        Immutable.Map({
          id: 2,
          portrait: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
          nickName: 'nickName',
          age: 27,
          sex: 1,
          status: 1, // 0冻结  1正常
          likeCount: 10, //收到橄榄枝数量
          phone: 1034923482,
          tags: '爱好1,爱好2,爱好3',
        }),
      ]),
      total: 10,
      currentPage: 1,
  }),
  userInfo: Immutable.Map({
    id: 1,
    portrait: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    nickName: 'nickName',
    age: 27,
    sex: 1,
    status: 1, // 0冻结  1正常
    likeCount: 10, //收到橄榄枝数量
    phone: 1034923482,
    tags: '爱好1,爱好2,爱好3',
    photos: '', // 上传的照片
  }),
  searchData: Immutable.Map({
    id: '',
    sex: '',
    page: 1,
  })
});

const getUserListHandler = new ActionHandler.handleAction(UserAction.GET_USERLIST)
  .success((state, action) => {
    return state.set('userList', Immutable.fromJS(action.data))
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
