
import React, { PropTypes } from 'react';
import DashInfoHeader from './DashInfoHeader';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as DashAction from '../../actions/DashAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import { isDisabled } from '../../core/CommonFun/CoreState';
import UploadComponents from '../../common/Upload/UploadComponents';
import amumu from 'amumu';
import { Form, Input, Select, Radio, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

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
      // this.clearDashInfo();
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
    // this.clearDashInfo();
  }
  showSignupPeople(signupPeople) {
    const views = [];
    if(signupPeople) {
      signupPeople.map((item, key) => {
        views.push(
          <div key={key} style={{ margin: '20px' }}>
              <div>{item.get('name')}</div>
              <div>{item.get('sex')}</div>
          </div>
        );
      })
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
                label="副标题"
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
                    placeholder="副标题"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动banner"
                hasFeedback
              >
                <UploadComponents
                   multiple={false}
                   imgURLArray={this.props.dashInfo.get('photos')}
                   type="public"
                   onChange={(value) => {
                     this.props.changeAction(
                       `DashReducer/dashInfo/photos`, value);
                   }}
                   dir={`prescription/${moment().format('YYYY_MM')}`}
                 />
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
                label="活动时间："
                {...formItemLayout}
              >
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '300px' }}
                disabled={this.isDisabled()}
                value={
                  [this.props.dashInfo.get('startTime') ?
                   moment(this.props.dashInfo.get('startTime'),
                    'YYYY-MM-DD') : undefined,
                    this.props.dashInfo.get('endTime') ?
                    moment(this.props.dashInfo.get('endTime'),
                     'YYYY-MM-DD') : undefined,
                  ]}
                onChange={(date, dateString) => {
                  this.props.changeAction(
                     'DashReducer/dashInfo/startTime',
                      dateString[0],
                    );
                  this.props.changeAction(
                     'DashReducer/dashInfo/endTime',
                     dateString[1],
                    );
                }}
              />
              </FormItem>
              
              <FormItem
                label="报名时间："
                {...formItemLayout}
              >
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '300px' }}
                disabled={this.isDisabled()}
                value={
                  [this.props.dashInfo.get('signupStartTime') ?
                   moment(this.props.dashInfo.get('signupStartTime'),
                    'YYYY-MM-DD') : undefined,
                    this.props.dashInfo.get('signupEndTime') ?
                    moment(this.props.dashInfo.get('signupEndTime'),
                     'YYYY-MM-DD') : undefined,
                  ]}
                onChange={(date, dateString) => {
                  this.props.changeAction(
                     'DashReducer/dashInfo/signupStartTime',
                      dateString[0],
                    );
                  this.props.changeAction(
                     'DashReducer/dashInfo/signupEndTime',
                     dateString[1],
                    );
                }}
              />
              </FormItem>
              
              <FormItem
                {...formItemLayout}
                label="活动人数（男）"
                hasFeedback
              >
              {
                this.isDisabled() ?
                <text>{this.props.dashInfo.get('boyNum')}</text> :
                getFieldDecorator('boyNum', {
                  initialValue: this.props.dashInfo.get('boyNum'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/dashInfo/boyNum', e.target.value);
                  },
                })(
                <InputNumber
                  placeholder="男生人数"
                />
              )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动人数（女）"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('girlNum')}</text> :
                  getFieldDecorator('girlNum', {
                    initialValue: this.props.dashInfo.get('girlNum'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/girlNum', e.target.value);
                    },
                  })(
                  <InputNumber
                    placeholder="女生人数"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动费用（男）"
                hasFeedback
              >
              {
                this.isDisabled() ?
                <text>{this.props.dashInfo.get('girlMoney')}</text> :
                getFieldDecorator('girlMoney', {
                  initialValue: this.props.dashInfo.get('girlMoney'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/dashInfo/girlMoney', e.target.value);
                  },
                })(
                <InputNumber
                />
              )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动费用（女）"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('girlMoney')}</text> :
                  getFieldDecorator('girlMoney', {
                    initialValue: this.props.dashInfo.get('girlMoney'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/girlMoney', e.target.value);
                    },
                  })(
                  <InputNumber
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动流程"
                hasFeedback
              >
                {getFieldDecorator('activityFlow',
                  {
                    rules: [
                      { required: true, message: '活动流程不能为空' },
                    ],
                    initialValue: this.props.dashInfo.get('activityFlow'),
                    onChange: (e) => this.props.changeAction(
                      'DashReducer/dashInfo/activityFlow', e.target.value),
                  })(
                      <Input
                        type="textarea"
                        rows="5"
                        disabled={this.isDisabled()}
                      />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="友情提示"
                hasFeedback
              >
                {getFieldDecorator('tips',
                  {
                    rules: [
                      { required: true, message: '友情提示不能为空' },
                    ],
                    initialValue: this.props.dashInfo.get('tips'),
                    onChange: (e) => this.props.changeAction(
                      'DashReducer/dashInfo/tips', e.target.value),
                  })(
                      <Input
                        type="textarea"
                        rows="5"
                        disabled={this.isDisabled()}
                      />
                )}
              </FormItem>
              </View>
              {/* 发起人信息 */}
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
                <Input
                  placeholder="发起人ID"
                />
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
                <Input
                  placeholder="发起人名字"
                />
              )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="发起人头像"
                hasFeedback
              >
                <UploadComponents
                   multiple={false}
                   imgURLArray={this.props.dashInfo.get('originUserImg')}
                   type="public"
                   onChange={(value) => {
                     this.props.changeAction(
                       `DashReducer/dashInfo/originUserImg`, value);
                   }}
                   dir={`prescription/${moment().format('YYYY_MM')}`}
                 />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="发起人描述"
                hasFeedback
              >
                {getFieldDecorator('originUserDesc',
                  {
                    initialValue: this.props.dashInfo.get('originUserDesc'),
                    onChange: (e) => this.props.changeAction(
                      'DashReducer/dashInfo/originUserDesc', e.target.value),
                  })(
                      <Input
                        type="textarea"
                        rows="5"
                        disabled={this.isDisabled()}
                      />
                )}
              </FormItem>
            </View>
            {/* 报名人数 */}
            <View className={ Contentstyles.formHeader } >
              报名人信息
            </View>
            <View className={ Contentstyles.formContent } >
                 <div style={{ display: 'flex' }}>
                    {this.showSignupPeople(this.props.dashInfo.get('signupPeople'))}
                 </div>
            </View>
          </Form>
        </View>
      </View>
    );
  }
}

export default Form.create()(DashInfo);
