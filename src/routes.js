/*
 * @flow
 */
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import * as RoutingURL from './core/RoutingURL/RoutingURL';
import RootContainer from './container/RootContainer';
import AppContainer from './container/AppContainer';
import LoginContainer from './container/LoginContainer';
import BannerList from './components/BannerList';
import Banner from './components/Banner';
import DashList from './components/DashList';
import DashInfo from './components/DashInfo';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';

const routes = (
  <Route path={RoutingURL.PrefixURL()} component={RootContainer} >
    <Route path={RoutingURL.App()} component={AppContainer} >
      <IndexRoute component={BannerList} />
      <Route path={RoutingURL.BannerList()} component={BannerList} />
      <Route path={RoutingURL.Banner('(:id)')} component={Banner} />
      <Route path={RoutingURL.DashList()} component={DashList} />
      <Route path={RoutingURL.DashInfo('(:id)')} component={DashInfo} />
      <Route path={RoutingURL.UserList()} component={UserList} />
      <Route path={RoutingURL.UserInfo('(:id)')} component={UserInfo} />
    </Route>
    <Route path={RoutingURL.Login()} component={LoginContainer} />
  </Route>
);

export default routes;
