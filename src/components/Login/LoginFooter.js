/**
 * Created by wl on 16/4/13.
 */
import React, { PropTypes } from 'react';
import { View, Text } from 'isomorphic';
import styles from '../../assets/stylesheets/Login/Login.css';

const propTypes = {
  slogan: PropTypes.string,
};

const LoginFooter = (props) => {
  return (
    <View className={ styles.LoginFooter }>
      <Text className={styles.slogan}>{props.slogan}<a href="https://mail.mxhichina.com/">问题反馈</a></Text>
    </View>
  );
};
LoginFooter.propTypes = propTypes;
export default LoginFooter;
