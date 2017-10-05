
import React, { PropTypes } from 'react';
import UserInfoHeader from './UserInfoHeader';
import UserDashList from './UserDashList';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as Contentstyles from '../../assets/stylesheets/FromContent.css';
import * as UserAction from '../../actions/UserAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import { isDisabled } from '../../core/CommonFun/CoreState';
import UploadComponents from '../../common/Upload/UploadComponents';
import amumu from 'amumu';
import { Form, Input, Select, Radio, Switch } from 'antd';
import Gallery from '../../common/CommonImage/Gallery'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

function getIncomeDesc(income) {
  if (income === 1) {
    return '5万以下';
  } else if (income === 2) {
    return '5-10万';
  } else if (income === 3) {
    return '10-20万';
  } else if (income === 4) {
    return '20-40万';
  } else if (income === 5) {
    return '40-80万';
  } else if (income === 6) {
    return '80万以上';
  }
}

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
      this.props.dispatch(UserAction.getUserInfo({id: this.props.params.id}));
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
      portrait: '',
      nickName: '',
      age: '',
      sex: '',
      status: '', // 0冻结  1正常
      likeCount: '', //收到橄榄枝数量
      phone: '',
      tags: '',
      photos: '', // 上传的照片
      wxPortrait: '',
      wxAccount: '',
      wxName: '',
      userName: '',
      boyInfo: {},
      dashList: [],
    }));
  }
  componentWillUnmount() {
    this.clearUserInfo();
  }
  showImgList(imgs) {
    const views = [];
    if(imgs) {
      const imgArr = imgs.split(',');
      imgArr.map((item) => {
        views.push(<div className={Contentstyles.userPhoto}>
          <Gallery
            device="pc"
            width="100"
            height="100"
            imageSource={[{
              src: item,
              thumbnail: item,
              thumbnailWidth: 100,
              thumbnailHeight: 100,
              caption: '点击图片进行旋转',
            }]}
          />
          {/* <img src={item} width="100%" heigth="100%" /> */}
        </div>)
      });
    }
    return views;
  }
  showTagList(tags) {
    const views = [];
    if(tags) {
      const tagArr = tags.split(',');
      tagArr.map((item) => {
        views.push(<div className={Contentstyles.userTag}>{item}</div>)
      });
    }
    return views;
  }
  isDisabled() {
    return isDisabled(this.props.params.id, this.props.location.query.editing);
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
          <div>用户状态:&nbsp;&nbsp;
              <Switch
                checked={Boolean(this.props.userInfo.get('status'))}
                onChange={(e) => {
                  this.props.dispatch(UserAction.updateUser({ id: this.props.userInfo.get('id'), status: Number(e) }))
                }}
                disabled={this.isDisabled()}
                checkedChildren="屏蔽"
                unCheckedChildren="解冻"
              />
          </div>
          <View className={Contentstyles.basicTable}>
            <table>
              <tbody><tr>
                <td>用户ID：{this.props.userInfo.get('id')}</td>
                {/* <td>用户昵称{this.props.userInfo.get('nickName')}</td> */}
                <td>手机号：{this.props.userInfo.get('phone')}</td>
              </tr>
              <tr>
                {/* <td>微信号：{this.props.userInfo.get('wxAccount')}</td> */}
                <td>微信昵称：{this.props.userInfo.get('wxName')}</td>
                <td>头像：
                    <img src={this.props.userInfo.get('wxPortrait')}
                       style={{ width: '60px', height: '60px', border: '1px solid #ccc', borderRadius: '60px' }}
                    />
                </td>
              </tr>
              <tr>
                <td>性别：{this.props.userInfo.get('sex') ? (this.props.userInfo.get('sex') == 1 ? '男' : '女') : '未知'}</td>
                <td>年龄：{this.props.userInfo.get('age')}</td>
                <td>收到橄榄枝的数量：{this.props.userInfo.get('likeCount')}</td>
              </tr></tbody>
            </table>
            {this.props.userInfo.get('sex') == 1 ?
            <table style={{ marginTop: '20px' }}>
              <tbody>
                <tr>
                  <td>身高：{this.props.userInfo.get('var2')}</td>
                  <td>职业： {this.props.userInfo.get('profession')}</td>
                  <td>职位：{this.props.userInfo.get('position')}</td>
                </tr>
                <tr>
                  <td>家乡：{this.props.userInfo.get('var3')}</td>
                  <td>收入：{getIncomeDesc(this.props.userInfo.get('income'))}</td>
                  <td>特长：{this.props.userInfo.get('var4')}</td>
                </tr>
              </tbody>
            </table>: <div />}
        </View>
          <View className={ Contentstyles.formHeader } >
            用户上传个人照片展示
          </View>
          <View className={ Contentstyles.userPhotos } >
              {this.showImgList(this.props.userInfo.get('photos'))}
          </View>
          <View className={ Contentstyles.formHeader } >
            个人标签展示
          </View>
          <View className={ Contentstyles.userTags } >
            {this.showTagList(this.props.userInfo.get('tags'))}
          </View>
        </Form>
        </View>
      </View>
    );
  }
}

export default Form.create()(UserInfo);
