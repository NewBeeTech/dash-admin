
import React, { PropTypes } from 'react';
import BannerHeader from './BannerHeader';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as BannerAction from '../../actions/BannerAction';
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
class Banner extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    bannerList: PropTypes.instanceOf(Immutable.Map).isRequired,
    getValue: PropTypes.func,
    dispatch: PropTypes.func,
    changeAction: PropTypes.func,
    form: PropTypes.any,
  };
  componentWillMount() {
    console.log(this.props.params.id);
    if(this.props.params.id){
      // this.props.dispatch(BannerAction.getBannerInfo({id: this.props.params.id}));
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
    dispatch(BannerAction.addBannerInfo(params));
  }
  _updateAction = (dispatch) => (params: {}) => {
    dispatch(BannerAction.updateBannerInfo(params));
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
      smallTitle: '',
      url: '',
      createTime: '',
      status: '',
      type: '',
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
            updateAction={this._createAction(this.props.dispatch)}
            createAction={this._updateAction(this.props.dispatch)}
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
              <FormItem
                {...formItemLayout}
                label="标题"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('title')}</text> :
                  getFieldDecorator('title', {
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
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="小标题"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('smallTitle')}</text> :
                  getFieldDecorator('smallTitle', {
                    initialValue: this.props.bannerInfo.get('smallTitle'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/smallTitle', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="小标题"
                  />
                )}
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
                label="状态"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.bannerInfo.get('status') ? '上线' : '下线'}</text> :
                  getFieldDecorator('status', {
                    initialValue: this.props.bannerInfo.get('status'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'BannerReducer/bannerInfo/status', e.target.value);
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
                label="Banner图片"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.getValue('HospitalInfoReducer/info/alias')}</text> :
                  getFieldDecorator('alias', {
                    initialValue: this.props.getValue(
                      'HospitalInfoReducer/info/alias'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'HospitalInfoReducer/info/alias', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="Banner图片"
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
