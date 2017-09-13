/**
 * Created by leiyouwho on 16/4/2016.
 */


import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import userInfoStorage from '../core/UserInfoStorage';
import { View } from 'isomorphic';
import TopBar from '../components/TopBar';
import Menus from '../components/Menus';
// import Panel from '../components/Panel';
import { push } from 'react-router-redux';
import * as RoutingURL from '../core/RoutingURL/RoutingURL';
import { dispatch } from '../store';

import styles from '../assets/stylesheets/RootContainer.css';

class AppContainer extends React.PureComponent {
  componentWillMount() {
  }
  render() {
    return (
      <View className={styles.RootContainer}>
        <View className={styles.menuContainer}>
          <Menus />
        </View>
        <View className={styles.rightContainer}>
          <TopBar className={styles.rightTopBar} />
          <View className={styles.rightContent}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node,
};

AppContainer.defaultProps = {};


export default AppContainer;
