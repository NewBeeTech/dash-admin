
import React, { PropTypes } from 'react';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/Login/Login.css';

import * as LoginAction from '../../actions/LoginAction';

const loginAction = (dispatch: Function) => (params: Object) => {
  dispatch(LoginAction.getLOGIN(params));
};

const Login = (props) => {
  return (
    <View className={ styles.login }>
      <View className={ styles.loginHeader } >
        <LoginHeader />
      </View>
      <View className={ styles.loginForm } >
        <LoginForm loginAction={loginAction(props.dispatch)} />
      </View>
      <View className={ styles.loginFooter } >
        <LoginFooter />
      </View>
    </View>
  );
};
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Login;
