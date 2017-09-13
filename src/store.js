/* @flow */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import { routerMiddleware } from 'react-router-redux';
import amumu from 'amumu';
import { hashHistory, browserHistory } from 'react-router';
import AppInfo from '../AppInfo';
const prod = AppInfo.prod;
// const history = prod ? browserHistory : hashHistory;
const history = hashHistory;
// import { crashMonitorMiddleware } from './core/monitor/crashMonitorMiddleware';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = routerMiddleware(history);


let createStoreWithMiddleware;
if (prod) {
  createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    // crashMonitorMiddleware,
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
  )(createStore);
}


const store = createStoreWithMiddleware(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

const handleSubscribe = () => {
  amumu.redux.Global.setStore(store.getState());
};
store.subscribe(handleSubscribe);

amumu.redux.Global.setDispatch(store.dispatch);

// reduxRouterMiddleware.listenForReplays(store);

export default store;

export const dispatch = store.dispatch;
