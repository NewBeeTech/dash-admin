/**
 * Created by wl on 16/4/13.
 */
import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Form, Input, Button, Checkbox } from 'antd';
import { View, Text } from 'isomorphic';
import styles from '../../assets/stylesheets/Login/Login.css';

const FormItem = Form.Item;

class LoginForm extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: 校验
    const password = this.props.form.getFieldsValue().password;
    const userName = this.props.form.getFieldsValue().userName;
    this.props.loginAction({userName, passWord: password});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <View className={styles.loginForm} >
        <Form className={styles.myForm} onSubmit={this._handleSubmit}>
          <FormItem wrapperCol={{ span: 15, offset: 5 }} >
            <Text className={ styles.formTitle } >后台运营管理系统</Text>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 15, offset: 5 }}
          >
          {getFieldDecorator('userName')(
            <Input
              type="text"
              placeholder="账户名/手机号"
            />
          )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 15, offset: 5 }}
          >
          {getFieldDecorator('password')(
            <Input
              type="password"
              placeholder="密码"
            />
          )}
          </FormItem>
          <FormItem wrapperCol={{ span: 15, offset: 5 }} >
            <label className="ant-checkbox-inline" style={{ marginTop: '-1vh' }} >
              <Checkbox />保持登录状态
            </label>
          </FormItem>
          <FormItem wrapperCol={{ span: 15, offset: 5 }} >
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
          <FormItem wrapperCol={{ span: 15, offset: 5 }} className={styles.forget} >
            忘记密码?请直接联系后台工作人员
          </FormItem>
        </Form>
      </View>
    );
  }
}

LoginForm.propTypes = {
  loginAction: PropTypes.func.isRequired,
  form: PropTypes.any,
};

export default Form.create()(LoginForm);
