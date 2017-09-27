
import React, { PropTypes } from 'react';
import DashInfoHeader from './DashInfoHeader';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as DashAction from '../../actions/DashAction';
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
class DashInfo extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    dashList: PropTypes.instanceOf(Immutable.Map).isRequired,
    getValue: PropTypes.func,
    dispatch: PropTypes.func,
    changeAction: PropTypes.func,
    form: PropTypes.any,
  };
  componentWillMount() {
    if(this.props.params.id){
      // this.props.dispatch(BannerAction.getBannerInfo({id: this.props.params.id}));
    } else {
      this.clearDashInfo();
    }
  }
  /**
   * 回退
   * @param dispatch
   * @private
   */
  _goBackAction = (dispatch: Function) => () => {
    dispatch(push(RoutingURL.DashList()));
  }
  _goUpdateAction = (dispatch: Function) => (id: string) => {
    dispatch(push(RoutingURL.DashInfo(id, true)));
  }
  _createAction = (dispatch) => (params: {}) => {
    dispatch(DashAction.addDashInfo(params));
  }
  _updateAction = (dispatch) => (params: {}) => {
    dispatch(DashAction.updateDashInfo(params));
  }
  isDisabled() {
    return isDisabled(this.props.params.id, this.props.location.query.editing);
  }
  clearDashInfo() {
    this.props.changeAction('DashReducer/dashInfo',
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
    this.clearDashInfo();
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
          <DashInfoHeader
            id={this.props.params.id}
            form={this.props.form}
            editing={this.props.location.query.editing}
            goBackAction={this._goBackAction(this.props.dispatch)}
            goUpdateAction={this._goUpdateAction(this.props.dispatch)}
            updateAction={this._createAction(this.props.dispatch)}
            createAction={this._updateAction(this.props.dispatch)}
            params={this.props.dashInfo.toJS()}
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
                  <text>{this.props.dashInfo.get('title')}</text> :
                  getFieldDecorator('title', {
                    initialValue: this.props.dashInfo.get('title'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/title', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="标题"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="小标题"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('smallTitle')}</text> :
                  getFieldDecorator('smallTitle', {
                    initialValue: this.props.dashInfo.get('smallTitle'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/smallTitle', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="小标题"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动banner"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('photos')}</text> :
                  getFieldDecorator('photos', {
                    initialValue: this.props.dashInfo.get('photos'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/photos', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="活动banner"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="状态"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('status') ? '上线' : '下线'}</text> :
                  getFieldDecorator('status', {
                    initialValue: this.props.dashInfo.get('status'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/status', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={0}>上线</Radio>
                      <Radio value={1}>下线</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动类型"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动时间"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="报名时间"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              
              <FormItem
                {...formItemLayout}
                label="活动人数（男）"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动人数（女）"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动费用（男）"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动费用（女）"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') ? '上线' : '下线'}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动流程"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('activityFlow')}</text> :
                  getFieldDecorator('activityFlow', {
                    initialValue: this.props.dashInfo.get('activityFlow'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/activityFlow', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="友情提示"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('tips')}</text> :
                  getFieldDecorator('tips', {
                    initialValue: this.props.dashInfo.get('tips'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/tips', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              </View>
              <View className={ Contentstyles.formHeader } >
                发起人信息
              </View>
              <View className={ Contentstyles.formContent } >
              <FormItem
                {...formItemLayout}
                label="发起人ID"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('originUserId')}</text> :
                  getFieldDecorator('originUserId', {
                    initialValue: this.props.dashInfo.get('originUserId'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/originUserId', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="发起人名字"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('originUserName')}</text> :
                  getFieldDecorator('originUserName', {
                    initialValue: this.props.dashInfo.get('originUserName'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/originUserName', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="发起人头像"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('originUserImg')}</text> :
                  getFieldDecorator('originUserImg', {
                    initialValue: this.props.dashInfo.get('originUserImg'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/originUserImg', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="发起人描述"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('originUserDesc')}</text> :
                  getFieldDecorator('originUserDesc', {
                    initialValue: this.props.dashInfo.get('originUserDesc'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/originUserDesc', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
                      <Radio value={2}>聚餐</Radio>
                    </RadioGroup>
                )}
              </FormItem>
            </View>
            <View className={ Contentstyles.formHeader } >
              报名人信息
            </View>
            <View className={ Contentstyles.formContent } >
                报名人信息
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default Form.create()(DashInfo);
