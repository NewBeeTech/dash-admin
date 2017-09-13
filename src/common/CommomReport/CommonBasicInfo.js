/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import { Button, Modal, Timeline, Row, Col } from 'antd';
import styles from '../../assets/stylesheets/ContentStyle/ContentDetail.css';
import type { } from '../../actions/types';
import PreviewCookingReport from './../../components/CookingReport/PreviewCookingReport';
import PreviewEmotionReport from './../../components/EmotionReport/PreviewEmotionReport';
import PreviewSleepReport from './../../components/SleepReport/PreviewSleepReport';
import PreviewPhyReport from './../../components/PhyActivityReport/PreviewPhyReport';
import PreviewSingleReport from './../../components/SingleHealthReport/PreviewSingleReport';
import PreviewDietReport from './../../components/HealthReport/PreviewDietReport';
import * as ReportPreviewAction from './../../actions/ReportPreviewAction';
import { getReportDetails } from './../../common/CommomReport/CommonRequest';
import { connect } from 'react-redux';
import { redux } from 'amumu';

const TimeItem = Timeline.Item;
type Props = {
  basicInfo: Immutable.Map<string, any>,
  userReport: Immutable.Map<string, any>,
  showHistory: boolean,
  visible: boolean,
};

const renderStatus = (text) => {
  let fontColor;
  switch (text) {
    case '未编辑':
      fontColor = '#ffb100';
      break;
    case '待发送':
      fontColor = '#58b9fa';
      break;
    case '发送中':
      fontColor = '#8ed15d';
      break;
    case '已发送':
      fontColor = '#1372d8';
      break;
    case '发送失败':
      fontColor = '#ff7271';
      break;
    default:
  }
  return fontColor;
};

@redux.ConnectStore
class CommonBasicInfo extends React.PureComponent {
  static propTypes = {
    basicInfo: PropTypes.instanceOf(Immutable.Map),
    userReport: PropTypes.instanceOf(Immutable.Map),
    dispatch: PropTypes.func,
    changeHistory: PropTypes.func,
    showHistory: PropTypes.bool,
    visible: PropTypes.bool,
    moudleIds: PropTypes.instanceOf(Immutable.List),
    moudleIds2: PropTypes.instanceOf(Immutable.List),
  };
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      moudleId: 1,
    };
  }
  state: {
    currentIndex: number,
    reportId: number,
  }
  componentWillMount() {
    this.state = {
      currentIndex: 0,
      isStrat: false,
    };
  }
  _pageNavAction(type: string) {
    // 当前浏览报告的ID
    const currentId = this.state.reportId;
    // 用户报告list
    const userReport = this.props.userReport.get('data');
    const nextArr = [];
    let nextIndex;
    if (type === 'next') {
      nextIndex = this.state.currentIndex + 1;
      if (nextIndex === this.props.moudleIds2.size) {
        userReport.map((report, key) => {
          if (report.get('reportId') === currentId) {
            if (key + 1 < userReport.size) {
              nextArr.push(userReport.get(key + 1).toJS());
              const nextId = nextArr[0].reportId;
              const nextType = nextArr[0].reportType;
              // 根据报告类型请求下一个报告
              getReportDetails(this.props.dispatch, nextType, nextId);
              this.state.reportId = nextId;
              this.state.reportType = nextType;
              nextIndex = 0;
              this.setState({
                ...this.state,
              });
            }
          }
          return false;
        });
      }
    }
    if (type === 'prep') {
      nextIndex = this.state.currentIndex - 1;
      if (nextIndex === -1) {
        userReport.map((report, key) => {
          if (report.get('reportId') === currentId) {
            if (key > 0) {
              nextArr.push(userReport.get(key - 1).toJS());
              // 获取上一个报告的ID
              const nextId = nextArr[0].reportId;
              const nextType = nextArr[0].reportType;
              console.log(nextId, nextType);
              getReportDetails(this.props.dispatch, nextType, nextId);
              this.state.reportId = nextId;
              this.state.reportType = nextType;
              nextIndex = this.props.moudleIds2.size - 1;
              this.setState({
                ...this.state,
              });
            }
          }
          return false;
        });
      }
    }
    const moudleIds = this.props.moudleIds2.toJS();
    const moudleId = moudleIds[nextIndex];
    this.setState({
      currentIndex: nextIndex,
      moudleId,
    });
  }
  renderData(lists) {
    const arr = [];
    lists.map((list) => {
      arr.push(
        <TimeItem
          key={list.get('reportId')}
          color={renderStatus(list.get('status'))}
        >
          <Row gutter={16}>
            <Col span={7}>{list.get('reportTime')}</Col>
            <Col span={5}>
              <a
                onClick={() => {
                  this.setState({
                    reportId: list.get('reportId'),
                    patientId: list.get('patientId'),
                    reportType: list.get('reportType'),
                    currentIndex: 0,
                    moudleId: 1,
                  });
                  this.props.changeAction('ReportPreviewReducer/visible', true);
                }}
              >{list.get('reportType')}</a></Col>
            <Col span={4}>{list.get('name') || list.get('nickName')}</Col>
            <Col span={4}>{list.get('applyType')}</Col>
            <Col style={{ color: renderStatus(list.get('status')) }} span={4}>
              {list.get('status')}
            </Col>
          </Row>
        </TimeItem>
      );
      return list;
    });
    return arr;
  }
  props: Props;
  renderPreview(reportId, reportType) {
    let renderMoudles;
    switch (reportType) {
      case '全面膳食评估':
        renderMoudles = (
          <PreviewDietReport
            pageNavAction={(type) => this._pageNavAction(type)}
            moudleId={this.state.moudleId}
            patientId={this.state.patientId}
            reportId={this.state.reportId}
            dispatch={this.props.dispatch}
            currentIndex={this.state.currentIndex}
          />
        );
        break;
      case '单一食物评估':
        renderMoudles = (
          <PreviewSingleReport
            pageNavAction={(type) => this._pageNavAction(type)}
            patientId={this.state.patientId}
            reportId={this.state.reportId}
            dispatch={this.props.dispatch}
            moudleId={this.state.moudleId}
            currentIndex={this.state.currentIndex}
            paramsId={this.props.paramsId}
          />
        );
        break;
      case '食物烹饪评估':
        renderMoudles = (
          <PreviewCookingReport
            pageNavAction={(type) => this._pageNavAction(type)}
            patientId={this.state.patientId}
            reportId={this.state.reportId}
            dispatch={this.props.dispatch}
            moudleId={this.state.moudleId}
            currentIndex={this.state.currentIndex}
            paramsId={this.props.paramsId}
          />
        );
        break;
      case '健康睡眠评估':
        renderMoudles = (
          <PreviewSleepReport
            pageNavAction={(type) => this._pageNavAction(type)}
            patientId={this.state.patientId}
            reportId={this.state.reportId}
            dispatch={this.props.dispatch}
            moudleId={this.state.moudleId}
            currentIndex={this.state.currentIndex}
            paramsId={this.props.paramsId}
          />
        );
        break;
      case '健康情绪评估':
        renderMoudles = (
          <PreviewEmotionReport
            pageNavAction={(type) => this._pageNavAction(type)}
            patientId={this.state.patientId}
            reportId={this.state.reportId}
            dispatch={this.props.dispatch}
            moudleId={this.state.moudleId}
            currentIndex={this.state.currentIndex}
            paramsId={this.props.paramsId}
          />
        );
        break;
      case '身体活动评估':
        renderMoudles = (
          <PreviewPhyReport
            pageNavAction={(type) => this._pageNavAction(type)}
            patientId={this.state.patientId}
            reportId={this.state.reportId}
            dispatch={this.props.dispatch}
            moudleId={this.state.moudleId}
            currentIndex={this.state.currentIndex}
            paramsId={this.props.paramsId}
          />
        );
        break;
      default:
    }
    return renderMoudles;
  }
  render() {
    return (
      <View style={{ textAlign: 'right' }} className={styles.commonBasicInfo}>
        <Button
          icon="clock-circle-o"
          type="primary"
          onClick={() => this.props.changeHistory()}
        >
          {this.props.showHistory ? '基本信息' : '历史记录'}
        </Button>
        {
          this.props.showHistory ?
          <View className={styles.basicTable2}>
            <View style={{ height: '150px', marginTop: '20px', marginLeft: '10px' }}>
              <Timeline>
                {this.renderData(this.props.userReport.get('data'))}
              </Timeline>
            </View>
          </View> :
          <View className={styles.basicTable}>
            <table>
              <caption>基本信息</caption>
              <tbody><tr>
                <td>患者姓名：{this.props.basicInfo.get('name')}</td>
                <td>出生日期：{this.props.basicInfo.get('birthday')}</td>
                <td>性别：{this.props.basicInfo.get('gender')}</td>
                <td>微信昵称：{this.props.basicInfo.get('nickname')}</td>
              </tr>
              <tr>
                <td>工作室：{this.props.basicInfo.get('doctorStudioName')}</td>
                <td>身高：{this.props.basicInfo.get('height')}</td>
                <td>体重：{this.props.basicInfo.get('weight')}</td>
                <td>饮酒：{this.props.basicInfo.get('isDrink')}</td>
              </tr>
              <tr>
                <td>吸烟：{this.props.basicInfo.get('isSmoke')}</td>
                <td>诊断详情：{this.props.basicInfo.get('diagnosisDetail')}</td>
                <td>扫码日期：{this.props.basicInfo.get('subscribeAt')}</td>
                <td>手机号：{this.props.basicInfo.get('mobile')}</td>
              </tr></tbody>
            </table>
          </View>
        }
          <Modal
            className={styles.commonBasicInfoModal}
            title="健康报告预览"
            visible={this.props.visible}
            width={800}
            footer={null}
            onCancel={() => {
              this.props.changeAction('ReportPreviewReducer/visible', false);
            }}
          >
            {this.renderPreview(this.state.reportId, this.state.reportType)}
          </Modal>
        </View>
    );
  }
}

// export default CommonBasicInfo;

const mapStateToProps = (state: Object): Object => ({
  moudleIds2: state.ReportPreviewReducer.get('moudleIds'),
});

export default connect(mapStateToProps)(CommonBasicInfo);
