/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/HealthReport/dietReport.css';
import type { } from '../../actions/types';
import { Icon } from 'antd';

type Props = {
  moudleIds: Immutable.List<string, any>,
  currentIndex: number,
  pageNavAction: Function,
  userReport: Immutable.Map<string, any>,
  reportId: number,
};

class CommonPageNav extends React.Component {
  static propTypes = {
    moudleIds: PropTypes.instanceOf(Immutable.List),
    userReport: PropTypes.instanceOf(Immutable.Map),
    currentIndex: PropTypes.number,
    reportId: PropTypes.number,
    pageNavAction: PropTypes.func,
  };
  componentWillMount() {
  }
  props: Props;
  isEnd(reportId: number) {
    let isDisabled = false;
    const userReport = this.props.userReport.get('data');
    if (userReport.size) {
      const lastestReport = userReport.slice(-1).get(0);
      if (this.props.currentIndex + 1 === this.props.moudleIds.size && lastestReport.get('reportId') === reportId) {
        isDisabled = true;
      }
    }
    return isDisabled;
  }
  isStart(reportId: number) {
    let isDisabled = false;
    const userReport = this.props.userReport.get('data');
    if (userReport.size) {
      const firstReport = userReport.slice(0, 1).get(0);
      if (this.props.currentIndex === 0 && firstReport.get('reportId') === reportId) {
        isDisabled = true;
      }
    }
    return isDisabled;
  }
  render() {
    const disableStyle = { color: '#999' };
    const disableBorder = { borderColor: '#999' };
    const current = this.props.currentIndex + 1;
    return (
      <View className={ styles.webPage}>
        <View
          onClick={() => this.isStart(this.props.reportId) ? '' : this.props.pageNavAction('prep')}
          className={styles.pageArrow}
          style={this.isStart(this.props.reportId) ? disableBorder : {}}
        ><Icon type="left" /></View>
          <span
            style={this.isStart(this.props.reportId) ? disableStyle : {}}
          >
            {current}
          </span>
           &nbsp;/&nbsp;
          <span
            style={this.isEnd(this.props.reportId) ? disableStyle : {}}
          >
            {this.props.moudleIds.size}
          </span>
        <View
          onClick={() => this.isEnd(this.props.reportId) ? '' : this.props.pageNavAction('next')}
          className={styles.pageArrow}
          style={this.isEnd(this.props.reportId) ? disableBorder : {}}
        ><Icon type="right" /></View>
      </View>
    );
  }
}

export default CommonPageNav;
