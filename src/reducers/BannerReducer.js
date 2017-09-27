
import * as BannerAction from '../actions/BannerAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  bannerList: Immutable.Map({
    bannerListData: Immutable.List([
        Immutable.Map({
          id: 1,
          img: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
          title: '标题1',
          smallTitle: 'dsf',
          url: 'http://www.baidu.com',
          createTime: '2017-09-20',
          status: 0,
        }),
        Immutable.Map({
          id: 2,
          img: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
          title: '标题2',
          smallTitle: 'dsf',
          url: 'http://www.baidu.com',
          createTime: '2017-09-20',
          status: 1,
        }),
      ]),
      total: 10,
      currentPage: 1,
  }),
  bannerInfo: Immutable.Map({
    id: 1,
    img: 'https://img.shaka.hsohealth.com/avatar/20170301_free.png',
    title: '标题1',
    smallTitle: 'dsf',
    url: 'http://www.baidu.com',
    createTime: '2017-09-20',
    status: 0,
    type: 1,
  }),
});

const getBannerListHandler = new ActionHandler.handleAction(BannerAction.GET_BANNERLIST)
  .success((state, action) => {
    return state.set('bannerList', Immutable.fromJS(action.data))
      .set('isFetching', false).set('errMsg', '');
  });
  
const getBannerInfoHandler = new ActionHandler.handleAction(BannerAction.GET_BANNERINFO)
    .success((state, action) => {
      return state.set('bannerInfo', Immutable.fromJS(action.data))
        .set('isFetching', false).set('errMsg', '');
    });
    
const addBannerHandler = new ActionHandler.handleAction(BannerAction.ADD_BANNER);
const updateBannerHandler = new ActionHandler.handleAction(BannerAction.UPDATE_BANNER);
const deleteBannerHandler = new ActionHandler.handleAction(BannerAction.DELETE_BANNER);


export default ActionHandler.handleActions(
  [getBannerListHandler, getBannerInfoHandler, addBannerHandler, updateBannerHandler, deleteBannerHandler],
  defaultState,
  /^BannerReducer\//
);
