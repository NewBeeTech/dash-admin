
import React, { PropTypes } from 'react';
import UserInfoHeader from './UserInfoHeader';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as UserAction from '../../actions/UserAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import { isDisabled } from '../../core/CommonFun/CoreState';
import UploadComponents from '../../common/Upload/UploadComponents';
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
    userInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    getValue: PropTypes.func,
    dispatch: PropTypes.func,
    changeAction: PropTypes.func,
    form: PropTypes.any,
  };
  componentWillMount() {
    if(this.props.params.id){
      // this.props.dispatch(UserAction.getUserInfo({id: this.props.params.id}));
    } else {
      // this.clearUserInfo();
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
      portrait: '',
      nickName: '',
      age: '',
      sex: '',
      status: '', // 0冻结  1正常
      likeCount: '', //收到橄榄枝数量
      phone: '',
      tags: '',
      photos: '', // 上传的照片
    }));
  }
  componentWillUnmount() {
    // this.clearUserInfo();
  }
  showImgList(imgs) {
    const views = [];
    if(imgs) {
      
    }
    return views;
  }
  showTagList(tags) {
    const views = [];
    if(tags) {
      
    }
    return views;
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
              label="用户ID"
              hasFeedback
            >
              <text>{this.props.userInfo.get('id')}</text>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户昵称"
              hasFeedback
            >
              <text>{this.props.userInfo.get('nickName')}</text>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户微信头像"
              hasFeedback
            >
              <img src={this.props.userInfo.get('portrait')} style={{ width: '80px', height: '80px'}}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
              hasFeedback
            >
              <text>{this.props.userInfo.get('phone')}</text>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="年龄"
              hasFeedback
            >
              <text>{this.props.userInfo.get('age')}</text>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="性别"
              hasFeedback
            >
              <text>{this.props.userInfo.get('age') ? (this.props.userInfo.get('age') == 1 ? '男' : '女') : '未知'}</text>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="账号状态"
              hasFeedback
            >
            {
              this.isDisabled() ?
              <text>{this.props.userInfo.get('status') ? '正常' : '屏蔽'}</text> :
              getFieldDecorator('status', {
                initialValue: this.props.userInfo.get('status'),
                onChange: (e) => {
                  this.props.changeAction(
                  'UserReducer/userInfo/status', e.target.value);
                },
              })(
                <RadioGroup>
                  <Radio value={1}>正常</Radio>
                  <Radio value={0}>屏蔽</Radio>
                </RadioGroup>
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="收到橄榄枝的数量"
              hasFeedback
            >
              <text>{this.props.userInfo.get('likeCount')}</text>
            </FormItem>
          </View>
          <View className={ Contentstyles.formHeader } >
            用户上传个人照片展示
          </View>
          <View className={ Contentstyles.formContent } >
              {this.showImgList(this.props.userInfo.get('photos'))}
          </View>
          <View className={ Contentstyles.formHeader } >
            个人标签展示
          </View>
          <View className={ Contentstyles.formContent } >
            {this.showTagList(this.props.userInfo.get('tags'))}
          </View>
          <View className={ Contentstyles.formHeader } >
            相关活动展示
          </View>
          <View className={ Contentstyles.formContent } >
           相关活动展示
          </View>
        </Form>
        </View>
      </View>
    );
  }
}

export default Form.create()(UserInfo);
