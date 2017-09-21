/**
 * Created by wl on 16/4/12.
 */
import React, { PropTypes } from 'react';
import { View, Text } from 'isomorphic';
import styles from '../../assets/stylesheets/Login/Login.css';
import LOGO from '../../assets/images/LOGO.svg';
const propTypes = {
  icon: PropTypes.node,
};

const LoginHeader = (props) => {
  return (
    <View className={ styles.loginHeader }>
      <LOGO width="80" height="80" />
    </View>
  );
};
LoginHeader.propTypes = propTypes;
export default LoginHeader;
