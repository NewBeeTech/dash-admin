/*
 * @flow
 */
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import RootContainer from './container/RootContainer';
import AppContainer from './container/AppContainer';
import * as RoutingURL from './core/RoutingURL/RoutingURL';


const routes = (
  <Route path={RoutingURL.PrefixURL()} component={RootContainer} >
    <Route path={RoutingURL.App()} component={AppContainer} >
    </Route>
  </Route>
);

export default routes;
