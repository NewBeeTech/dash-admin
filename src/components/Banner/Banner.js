
import React, { PropTypes } from 'react';
import BannerHeader from './BannerHeader';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as BannerAction from '../../actions/BannerAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import { isDisabled } from '../../core/CommonFun/CoreState';
import UploadComponents from '../../common/Upload/UploadComponents';
import amumu from 'amumu';
import moment from 'moment';
import { Form, Input, Select, Radio, DatePicker, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

@amumu.redux.ConnectStore
@amumu.decorators.Loading('pc')
class Banner extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    bannerInfo: PropTypes.instanceOf(Immutable.Map).isRequired,
    getValue: PropTypes.func,
    dispatch: PropTypes.func,
    changeAction: PropTypes.func,
    form: PropTypes.any,
  };
  componentWillMount() {
    if(this.props.params.id){
      this.props.dispatch(BannerAction.getBannerInfo({id: this.props.params.id}));
    } else {
      this.clearBannerInfo();
    }
  }
  /**
   * 回退
   * @param dispatch
   * @private
   */
  _goBackAction = (dispatch: Function) => () => {
    dispatch(push(RoutingURL.BannerList()));
  }
  _goUpdateAction = (dispatch: Function) => (id: string) => {
    dispatch(push(RoutingURL.Banner(id, true)));
  }
  _createAction = (dispatch) => (params: {}) => {
    dispatch(BannerAction.addBanner(params));
  }
  _updateAction = (dispatch) => (params: {}) => {
    dispatch(BannerAction.updateBanner(params));
  }
  isDisabled() {
    return isDisabled(this.props.params.id, this.props.location.query.editing);
  }
  clearBannerInfo() {
    this.props.changeAction('BannerReducer/bannerInfo',
    Immutable.fromJS({
      id: '',
      img: '',
      title: '',
      secondTitle: '',
      url: '',
      createTime: '',
      status: '',
      type: '',
      startTime: '',
      endTime: '',
      sort: 0,
    }));
  }
  componentWillUnmount() {
    this.clearBannerInfo();
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
          <BannerHeader
            id={this.props.params.id}
            form={this.props.form}
            editing={this.props.location.query.editing}
            goBackAction={this._goBackAction(this.props.dispatch)}
            goUpdateAction={this._goUpdateAction(this.props.dispatch)}
            createAction={this._createAction(this.props.dispatch)}
            updateAction={this._updateAction(this.props.dispatch)}
            params={this.props.bannerInfo.toJS()}
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
              {/* <FormItem
                {...formItemLayout}
                label="标题"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('title')}</text> :
                  getFieldDecorator('title', {
                    rules: [
                       { required: true, message: '标题不能为空' },
                    ],
                    initialValue: this.props.bannerInfo.get('title'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/title', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="标题"
                  />
                )}
              </FormItem> */}
              {/* <FormItem
                {...formItemLayout}
                label="副标题"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('secondTitle')}</text> :
                  getFieldDecorator('secondTitle', {
                    rules: [
                       { required: true, message: '副标题不能为空' },
                    ],
                    initialValue: this.props.bannerInfo.get('secondTitle'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/secondTitle', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="副标题"
                  />
                )}
              </FormItem> */}
              {/* <FormItem
                {...formItemLayout}
                label="跳转地址"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('url')}</text> :
                  getFieldDecorator('url', {
                    initialValue: this.props.bannerInfo.get('url'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/url', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="跳转地址"
                  />
                )}
              </FormItem> */}
              <FormItem
                {...formItemLayout}
                label="状态"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('status') ? '上架' : '下架'}</text> :
                  getFieldDecorator('status', {
                    rules: [
                       { required: true, message: '状态必选' },
                    ],
                    initialValue: this.props.bannerInfo.get('status'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/status', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={0}>下架</Radio>
                      <Radio value={1}>上架</Radio>
                    </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Banner图片(750*375)"
                hasFeedback
              >
                <UploadComponents
                  multiple={false}
                  isDisable={this.isDisabled()}
                  imgURLArray={this.props.bannerInfo.get('img')}
                  type="public"
                  onChange={(value) => {
                    this.props.changeAction(
                      `BannerReducer/bannerInfo/img`, value);
                  }}
                  dir={`prescription/${moment().format('YYYY_MM')}`}
                />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="跳转地址"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                    <text>{this.props.bannerInfo.get('url')}</text> :
                  getFieldDecorator('url', {
                    initialValue: this.props.bannerInfo.get('url'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/url', e.target.value);
                    },
                  })(
                    <Input
                      placeholder="跳转地址"
                    />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="显示顺序："
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('sort')}</text> :
                  getFieldDecorator('sort', {
                    initialValue: this.props.bannerInfo.get('sort'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/sort', e);
                    },
                  })(
                  <InputNumber
                    min={0}
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

export default Form.create()(Banner);
