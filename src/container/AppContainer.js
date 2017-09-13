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
// import * as IM from '../core/IM/';
import * as IMAction from '../actions/IMAction';
import { dispatch } from '../store';

import styles from '../assets/stylesheets/RootContainer.scss';

class AppContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  componentWillMount() {
    const userId = userInfoStorage.getItem('userId');
    dispatch(IMAction.getStudiosConversationGroups({ id: userId }));
    // const rongcloudToken = IM.getRongcloudToken();
    // if (rongcloudToken) {
    //   IM.connect(rongcloudToken);
    // } else {
    //   dispatch(push(RoutingURL.Login()));
    // }
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
