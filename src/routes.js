/*
 * @flow
 */
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import * as RoutingURL from './core/RoutingURL/RoutingURL';
import RootContainer from './container/RootContainer';
import AppContainer from './container/AppContainer';
import LoginContainer from './container/LoginContainer';
import Shouye from './components/Shouye';

const routes = (
  <Route path={RoutingURL.PrefixURL()} component={RootContainer} >
    <Route path={RoutingURL.App()} component={AppContainer} >
      <Route path={RoutingURL.Shouye()} component={Shouye} />
    </Route>
    <Route path={RoutingURL.Login()} component={LoginContainer} />
  </Route>
);

export default routes;
