import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// 引入各reducers
import LoginReducer from './LoginReducer';
import BannerReducer from './BannerReducer';
import DashReducer from './DashReducer';
import UserReducer from './UserReducer';


// 状态入口
const appReducers = combineReducers({
  routing: routeReducer,
  LoginReducer,
  BannerReducer,
  DashReducer,
  UserReducer
});

export default appReducers;
