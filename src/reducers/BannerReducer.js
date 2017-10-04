
import * as BannerAction from '../actions/BannerAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  bannerList: Immutable.List([
  ]),
  bannerInfo: Immutable.Map({
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
