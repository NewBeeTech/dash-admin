/**
 * Created by wl on 16/4/12.
 */
import React, { PropTypes } from 'react';
import { View, Text } from 'isomorphic';
import styles from '../../assets/stylesheets/Login/Login.css';
const propTypes = {
  slogan: PropTypes.string,
  icon: PropTypes.node,
};

const LoginHeader = (props) => {
  return (
    <View className={ styles.loginHeader }>
      <Text className={styles.HeaderSlogan}>{props.slogan}</Text>
    </View>
  );
};
LoginHeader.propTypes = propTypes;
export default LoginHeader;
