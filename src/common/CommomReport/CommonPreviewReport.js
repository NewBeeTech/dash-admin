/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/ContentStyle/ContentDetail.css';
import type { Dispatch } from '../../actions/types';
import { Form, Popconfirm } from 'antd';
import moment from 'moment';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';

type Props = {
  editing: boolean,
  frontCoverData: Immutable.Map<string, any>,
  basicInfo: Immutable.Map<string, any>,
  form: Function,
  goDetailsAction: Function,
  sendReportAction: Function,
  removeReportAction: Function,
  patientId: number,
  status: number,
  editStatus: boolean,
  dispatch: Dispatch,
};

const FormItem = Form.Item;
const reportStatus = { 1: '未编辑', 2: '待发送', 3: '发送中', 4: '已发送' }
class CommonPreviewReport extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    frontCoverData: PropTypes.instanceOf(Immutable.Map),
    basicInfo: PropTypes.instanceOf(Immutable.Map),
    form: PropTypes.any,
    goDetailsAction: PropTypes.func,
    sendReportAction: PropTypes.func,
    removeReportAction: PropTypes.func,
    patientId: PropTypes.number,
    dispatch: PropTypes.func,
    status: PropTypes.number,
    editStatus: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      editStatus: this.props.editStatus,
    };
  }
  componentWillMount() {
    this.state = {
      status: this.props.status,
      editStatus: this.props.editStatus,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status) {
      this.setState({
        status: nextProps.status,
      });
    }
    if (this.props.editStatus !== nextProps.editStatus) {
      this.setState({
        editStatus: nextProps.editStatus,
      });
    }
  }
  props: Props;
  renderOperation(status) {
    const view = [];
    if (status === 1 || status === 2 || status === 5) {
      view.push(
        <span><a onClick={() => this.props.goDetailsAction(true)}>修改</a>&nbsp;&nbsp;&nbsp;</span>
      )
    }
    if (status === 2 || status === 4 || status === 5) {
      view.push(
        <span>
          <Popconfirm title="选择发送方式"
            onConfirm={() => {
              this.props.sendReportAction(true);
              this.setState({ status: 3 });
            }}
            onCancel={() => {
              this.props.sendReportAction(false);
              this.setState({ status: 3 });
            }}
            okText="延迟30分钟发送"
            cancelText="立即发送"
          >
            <a>发送</a>
          </Popconfirm>&nbsp;&nbsp;&nbsp;
        </span>
      );
    }
    if (this.state.editStatus) {
      view.push(
        <Popconfirm title="确认要删除该管理报告？"
          onConfirm={() => this.props.removeReportAction()}
          okText="确认"
          cancelText="取消"
        >
          <a style={{ color: '#FF7316' }}>
            删除
          </a>
        </Popconfirm>
      );
    }
    return view;
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      // <View className={styles.reportTable}>
        <View style={{ position: 'relative' }}>
          <FormItem
            {...formItemLayout}
            label="报告单位"
            hasFeedback
          >
            {this.props.frontCoverData.get('reportTo')}

          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告编号"
            hasFeedback
          >
            {this.props.frontCoverData.get('reportIdentifier')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用户编号"
            hasFeedback
          >
            {this.props.patientId}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="申请时间"
            hasFeedback
          >
            {moment(this.props.frontCoverData.get('reportTime')).format('YYYY.MM.DD')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告名称"
            hasFeedback
          >
            {this.props.frontCoverData.get('reportName')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告类型"
            hasFeedback
          >
            {this.props.frontCoverData.get('reportType')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告状态"
            hasFeedback
          >
            {reportStatus[this.state.status]}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="微信昵称"
            hasFeedback
          >
            {this.props.basicInfo.get('nickname')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="患者姓名"
            hasFeedback
          >
            {this.props.frontCoverData.get('name') || this.props.basicInfo.get('name')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="性别"
            hasFeedback
          >
            {this.props.basicInfo.get('gender')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="出生日期"
            hasFeedback
          >
            {this.props.basicInfo.get('birthday')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="诊断详情"
            hasFeedback
          >
            {this.props.basicInfo.get('diagnosisDetail')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="患者详情"
            hasFeedback
          >
            <a onClick={() =>
                this.props.dispatch(push(RoutingURL.patientInfo(this.props.patientId)))}
            >
              点击查看
            </a>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="操作"
            hasFeedback
          >
            <a onClick={() => this.props.goDetailsAction(false)}>查看</a>
            &nbsp;&nbsp;&nbsp;
            {this.renderOperation(this.state.status)}
          </FormItem>
        </View>
      // </View>
    );
  }
}

export default Form.create()(CommonPreviewReport);
