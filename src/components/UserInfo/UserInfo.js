
import React, { PropTypes } from 'react';
import UserInfoHeader from './UserInfoHeader';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as UserAction from '../../actions/UserAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import { isDisabled } from '../../core/CommonFun/CoreState';
import amumu from 'amumu';
import { Form, Input, Select, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@amumu.redux.ConnectStore
@amumu.decorators.Loading('pc')
class UserInfo extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    userList: PropTypes.instanceOf(Immutable.Map).isRequired,
    getValue: PropTypes.func,
    dispatch: PropTypes.func,
    changeAction: PropTypes.func,
    form: PropTypes.any,
  };
  componentWillMount() {
    if(this.props.params.id){
      // this.props.dispatch(UserAction.getUserInfo({id: this.props.params.id}));
    } else {
      this.clearUserInfo();
    }
  }
  /**
   * 回退
   * @param dispatch
   * @private
   */
  _goBackAction = (dispatch: Function) => () => {
    dispatch(push(RoutingURL.UserList()));
  }
  _goUpdateAction = (dispatch: Function) => (id: string) => {
    dispatch(push(RoutingURL.UserInfo(id, true)));
  }
  _updateAction = (dispatch) => (params: {}) => {
    dispatch(DashAction.updateUserInfo(params));
  }
  isDisabled() {
    return isDisabled(this.props.params.id, this.props.location.query.editing);
  }
  clearUserInfo() {
    this.props.changeAction('UserReducer/userInfo',
    Immutable.fromJS({
      id: '',
      type: '', // 活动类型
      photos: '',
      status: '', // 活动状态
      title: '',
      smallTitle: '',
      startTime: '', // 活动开始时间
      endTime: '', // 活动报名时间
      signupStartTime	: '', // 报名开始时间
      signupEndTime: '', // 报名报名时间
      boyNum: '',
      girlNum : '',
      boyMoney: '',
      girlMoney: '',
      activityFlow: '',
      tips: '',
      originUserId: '',
      originUserDesc: '',
      originUserName: '',
      originUserImg: '',
      signupPeople: Immutable.List([]),
    }));
  }
  componentWillUnmount() {
    this.clearUserInfo();
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    return (
      <View className={ Contentstyles.content }>
        <View className={ Contentstyles.contentHeader }>
          <UserInfoHeader
            id={this.props.params.id}
            form={this.props.form}
            editing={this.props.location.query.editing}
            goBackAction={this._goBackAction(this.props.dispatch)}
            goUpdateAction={this._goUpdateAction(this.props.dispatch)}
            updateAction={this._updateAction(this.props.dispatch)}
            params={this.props.userInfo.toJS()}
          />
        </View>
        <View className={ Contentstyles.contentContainer }>
          <Form
            horizontal
            form={this.props.form}
            className={ Contentstyles.contentBox }
          >
            <View className={ Contentstyles.formHeader } >
              基本信息
            </View>
            <View className={ Contentstyles.formContent } >
              <FormItem
                {...formItemLayout}
                label="标题"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.userInfo.get('id')}</text> :
                  getFieldDecorator('id', {
                    initialValue: this.props.userInfo.get('id'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'UserReducer/userInfo/id', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="标题"
                  />
                )}
              </FormItem>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default Form.create()(UserInfo);
