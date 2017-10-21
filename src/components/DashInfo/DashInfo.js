
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
import { Form, Input, Select, Radio, DatePicker, InputNumber, Icon, Button } from 'antd';
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
    status: PropTypes.number,
    dashList: PropTypes.instanceOf(Immutable.Map),
    getValue: PropTypes.func,
    dispatch: PropTypes.func,
    changeAction: PropTypes.func,
    form: PropTypes.any,
  };
  componentWillMount() {
    if(this.props.params.id){
      this.props.dispatch(DashAction.getDashInfo({activityId: this.props.params.id}));
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
    dispatch(DashAction.addDash(params));
  }
  _updateAction = (dispatch) => (params: {}) => {
    dispatch(DashAction.updateDash(params));
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
      name: '',
      var3: '',
      startTime: '', // 活动开始时间
      endTime: '', // 活动报名时间
      signupStartTime	: '', // 报名开始时间
      signupEndTime: '', // 报名报名时间
      boyNum: '',
      girlNum : '',
      boyMoney: '',
      var4: '',
      var1: '',
      var2: '',
      var5: '',
      originUserId: '',
      originUserDesc: '',
      originUserName: '',
      originUserImg: '',
      signupPeople: Immutable.List([]),
      collectUseList: Immutable.List([]),
    }));
    this.props.changeAction('DashReducer/status', '');
  }
  componentWillUnmount() {
    this.clearDashInfo();
  }
  showSignupPeople(signupPeople) {
    const views = [];
    if(signupPeople) {
      signupPeople.map((item, key) => {
        views.push(
          <div key={key} style={{ margin: '10px', width: '60px', heigth: '100px'}}>
              <div style={{ width: '60px', height: '60px', border: '1px solid #ccc', marginBottom: '10px'}}>
                  <img src={item.get('wxPortrait')} width="100%" height="100%"/>
              </div>
              <div>{item.get('wxName')}({item.get('sex') ? (item.get('sex') == 1 ? '男' : '女') : '未知'})</div>
              <div>{item.get('pingxxId')}</div>
              {/* <div>{item.get('')}</div> */}
          </div>
        );
      })
    }
    return views;
  }
  changeActivitySignupStatus = (params) => {
    this.props.dispatch(
      DashAction.changeActivitySignupStatus(params));
  }
  renderBaomingList(peoples) {
    const views = [];
    if (peoples) {
      peoples.map((item, key) => {
        const status = item.get('status');
        let statusDesc = '';
        if (status === 1) {
          statusDesc = '支付成功';
        } else if (status === 4) {
          statusDesc = '活动成功';
        } else if (status === 5) {
          statusDesc = '活动失败';
        }
        views.push(
          <div style={{ display: 'flex', flexDirection: 'row', padding: '5px' }}>
            <div style={{ width: '60px', height: '60px', border: '1px solid #ccc', marginBottom: '10px'}}>
                <img src={item.get('wxPortrait')} width="100%" height="100%"/>
            </div>
            <div style={{ margin: '0 5px' }}>
              <div>{item.get('wxName')}({item.get('sex') ? (item.get('sex') == 1 ? '男' : '女') : '未知'})</div>
              <div>pingxxId：{item.get('pingxxId')}</div>
              <div>状态：{statusDesc}</div>
            </div>
            {/* {status === 1 &&
              <div style={{ margin: '0 5px', color: '#1372D8' }} onClick={() => {
                this.changeActivitySignupStatus({
                  activityId: this.props.params.id,
                  status: 4,
                  userId: item.get('id'),
                  var2: '活动成功',
                  pingxxId: item.get('pingxxId'),
                });
              }}>
                标记活动成功
              </div>
            }
            {status === 1 &&
              <div style={{ margin: '0 5px', color: 'rgb(255, 115, 22)' }} onClick={() => {
                this.changeActivitySignupStatus({
                  activityId: this.props.params.id,
                  status: 5,
                  userId: item.get('id'),
                  var2: '活动失败',
                  pingxxId: item.get('pingxxId'),
                });
              }}>
                标记活动失败
              </div>
            }*/}
            {/* {status === 5 &&
              <div style={{ margin: '0 5px', color: '#1372D8' }}  onClick={() => {
                this.changeActivitySignupStatus({
                  activityId: this.props.params.id,
                  status: 4,
                  userId: item.get('id'),
                  var2: '活动成功',
                  pingxxId: item.get('pingxxId'),
                });
              }}>
                标记活动成功
              </div>
            }
            {status === 4 &&
              <div style={{ margin: '0 5px', color: 'rgb(255, 115, 22)' }}  onClick={() => {
                this.changeActivitySignupStatus({
                  activityId: this.props.params.id,
                  status: 5,
                  userId: item.get('id'),
                  var2: '活动失败',
                  pingxxId: item.get('pingxxId'),
                });
              }}>
                标记活动失败
              </div>
            } */}
          </div>
        )
      });
    }
    return views;
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const descs = form.getFieldValue('descs');
    // We need at least one passenger
    if (descs.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      descs: descs.filter(key => key !== k),
    });
  }

  add = (type) => {
    const { form } = this.props;
    // can use data-binding to get
    const descs = form.getFieldValue('descs');
    descs.push({
      type,
      content: '',
    });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      descs,
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 8, offset: 6 },
    };
    // console.log(this.props.dashInfo.get('desc'));
    getFieldDecorator('descs', { initialValue: this.props.dashInfo.get('desc') !== undefined ? JSON.parse(this.props.dashInfo.get('desc')) : [{ type: 1, content: '' }] });
    // getFieldDecorator('descs', { initialValue: [] });
    const descs = getFieldValue('descs');
    const params = this.props.dashInfo.toJS();
    params.desc = JSON.stringify(descs);
    // console.log(params);
    const formItems = descs.map((item, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '活动内容介绍' : ''}
          required={false}
          key={index}
        >
          {getFieldDecorator(`names-${index}`, {
            initialValue: item.content,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: '请填写内容或者删除该表单',
            }],
            onChange: e => {
              const value = item.type === 1 ? e.target.value : e;
              descs[index].content = value;
              this.props.form.setFieldsValue({
                descs,
              });
            },
          })(
            item.type === 1 ? <Input
              disabled={this.isDisabled()}
              type="textarea"
              rows="5"
              placeholder="活动内容介绍"
              style={{ width: '80%', marginRight: 8 }}
            /> :
            <UploadComponents
              multiple={false}
              imgURLArray={item.content}
              type="public"
              onChange={(value) => {
                console.log(value);
              }}
              dir={`prescription/${moment().format('YYYY_MM')}`}
              isDisable={this.isDisabled()}
            />
          )}
          {descs.length > 1 ? (
            <Icon
              // className="dynamic-delete-button"
              className={Contentstyles.deleteButton}
              type="minus-circle-o"
              disabled={descs.length === 1}
              onClick={this.isDisabled() ? '' : () => { this.remove(item) }}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <View className={Contentstyles.content}>
        <View className={Contentstyles.contentHeader}>
          <DashInfoHeader
            id={this.props.params.id}
            form={this.props.form}
            editing={this.props.location.query.editing}
            status={this.props.status}
            goBackAction={this._goBackAction(this.props.dispatch)}
            goUpdateAction={this._goUpdateAction(this.props.dispatch)}
            updateAction={this._updateAction(this.props.dispatch)}
            createAction={this._createAction(this.props.dispatch)}
            params={params}
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
                  <text>{this.props.dashInfo.get('name')}</text> :
                  getFieldDecorator('name', {
                    initialValue: this.props.dashInfo.get('name'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/name', e.target.value);
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
                  <text>{this.props.dashInfo.get('var3')}</text> :
                  getFieldDecorator('var3', {
                    initialValue: this.props.dashInfo.get('var3'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/var3', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="副标题"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动地点"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('address')}</text> :
                  getFieldDecorator('address', {
                    initialValue: this.props.dashInfo.get('address'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/address', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="活动地点"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="详细地址"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('var5')}</text> :
                  getFieldDecorator('var5', {
                    initialValue: this.props.dashInfo.get('var5'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/var5', e.target.value);
                    },
                  })(
                  <Input
                    placeholder="详细地址"
                  />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动banner(16:9 如 750*375)"
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
                   isDisable={this.isDisabled()}
                 />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="状态"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('status') ? '上架' : '下架'}</text> :
                  getFieldDecorator('status', {
                    initialValue: this.props.dashInfo.get('status'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/status', e.target.value);
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
                label="活动类型"
                hasFeedback
              >
                {
                  this.isDisabled() ?
                  <text>{this.props.dashInfo.get('type') === 1 ? '联谊' : ''}</text> :
                  getFieldDecorator('type', {
                    initialValue: this.props.dashInfo.get('type'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/type', e.target.value);
                    },
                  })(
                    <RadioGroup>
                      <Radio value={1}>联谊</Radio>
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
                    'YYYY-MM-DD HH:mm:ss') : undefined,
                    this.props.dashInfo.get('endTime') ?
                    moment(this.props.dashInfo.get('endTime'),
                     'YYYY-MM-DD HH:mm:ss') : undefined,
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
                    'YYYY-MM-DD HH:mm:ss') : undefined,
                    this.props.dashInfo.get('signupEndTime') ?
                    moment(this.props.dashInfo.get('signupEndTime'),
                     'YYYY-MM-DD HH:mm:ss') : undefined,
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
                    'DashReducer/dashInfo/boyNum', e);
                  },
                })(
                <InputNumber
                   min={0}
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
                      'DashReducer/dashInfo/girlNum', e);
                    },
                  })(
                  <InputNumber
                    min={0}
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
                <text>{this.props.dashInfo.get('cost')}</text> :
                getFieldDecorator('cost', {
                  initialValue: this.props.dashInfo.get('cost'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/dashInfo/cost', e);
                  },
                })(
                <InputNumber
                   min={0}
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
                  <text>{this.props.dashInfo.get('var4')}</text> :
                  getFieldDecorator('var4', {
                    initialValue: this.props.dashInfo.get('var4'),
                    onChange: (e) => {
                      this.props.changeAction(
                      'DashReducer/dashInfo/var4', e);
                    },
                  })(
                    <InputNumber min={0} />
                )}
              </FormItem>
              {formItems}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" disabled={this.isDisabled()} onClick={() => this.add(1)} style={{ width: '30%' }}>
                  <Icon type="plus" /> 添加文本
                </Button>
                <Button type="dashed" disabled={this.isDisabled()} onClick={() => this.add(2)} style={{ width: '30%', marginLeft: 20 }}>
                  <Icon type="plus" /> 添加图片
                </Button>
              </FormItem>
              {/* <FormItem
                {...formItemLayout}
                label="活动内容介绍"
                hasFeedback
              > */}
                {/* {getFieldDecorator('desc',
                  {
                    rules: [
                      { required: true, message: '活动内容介绍不能为空' },
                    ],
                    initialValue: this.props.dashInfo.get('desc'),
                    onChange: (e) => this.props.changeAction(
                      'DashReducer/dashInfo/desc', e.target.value),
                  })(
                      <Input
                        type="textarea"
                        rows="5"
                        disabled={this.isDisabled()}
                      />
                )} */}

              {/* </FormItem> */}
              <FormItem
                {...formItemLayout}
                label="活动流程"
                hasFeedback
              >
                {getFieldDecorator('var1',
                  {
                    rules: [
                      { required: true, message: '活动流程不能为空' },
                    ],
                    initialValue: this.props.dashInfo.get('var1'),
                    onChange: (e) => this.props.changeAction(
                      'DashReducer/dashInfo/var1', e.target.value),
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
                {getFieldDecorator('var2',
                  {
                    rules: [
                      { required: true, message: '友情提示不能为空' },
                    ],
                    initialValue: this.props.dashInfo.get('var2'),
                    onChange: (e) => this.props.changeAction(
                      'DashReducer/dashInfo/var2', e.target.value),
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
              <FormItem
                {...formItemLayout}
                label="发起人头像"
                hasFeedback
              >
                <UploadComponents
                   multiple={false}
                   imgURLArray={this.props.dashInfo.get('originUserPortrait') ? this.props.dashInfo.get('originUserPortrait') : ''}
                   type="public"
                   onChange={(value) => {
                     this.props.changeAction(
                       `DashReducer/dashInfo/originUserPortrait`, value);
                   }}
                   dir={`prescription/${moment().format('YYYY_MM')}`}
                   isDisable={this.isDisabled()}
                 />
              </FormItem>
            </View>
            {/* 报名人数 */}
            {this.props.params.id ?
              <div>
              <View className={ Contentstyles.formHeader } >
                报名人列表
              </View>
              <View className={ Contentstyles.formContent } >
                {this.renderBaomingList(this.props.dashInfo.get('signupPeople'))}
              </View>
              {/* 关注人数 */}
              <View className={ Contentstyles.formHeader } >
                关注人列表
              </View>
              <View className={ Contentstyles.formContent } >
                   <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {this.showSignupPeople(this.props.dashInfo.get('collectUseList'))}
                   </div>
              </View></div> : <div />
            }

          </Form>
        </View>
      </View>
    );
  }
}

export default Form.create()(DashInfo);
