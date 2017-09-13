/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/ContentStyle/ContentDetail.css';
import type { Dispatch } from '../../actions/types';
import shallowCompare from 'react-addons-shallow-compare';
import CommonBasicInfo from './CommonBasicInfo';
import CommonReportInfo from './CommonReportInfo';

type Props = {
  basicInfo: Immutable.Map<string, any>,
  frontCoverData: Immutable.Map<string, any>,
  userReport: Immutable.Map<string, any>,
  changeAction: Function,
  changeHistory: Function,
  editing: boolean,
  showHistory: boolean,
  params: Object,
  Component: any,
  defaultUrl: string,
  dispatch: Dispatch,
  moudleIds: Immutable.List<string, any>,
};

class PCReportHome extends React.Component {
  static propTypes = {
    changeAction: PropTypes.func,
    basicInfo: PropTypes.instanceOf(Immutable.Map),
    userReport: PropTypes.instanceOf(Immutable.Map),
    frontCoverData: PropTypes.instanceOf(Immutable.Map),
    editing: PropTypes.bool,
    params: PropTypes.object,
    Component: PropTypes.any,
    dispatch: PropTypes.func,
    changeHistory: PropTypes.func,
    showHistory: PropTypes.bool,
    moudleIds: PropTypes.instanceOf(Immutable.List),
  };
  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return shallowCompare(this, nextProps, nextState);
  }
  props: Props;
  render() {
    return (
      <View className={styles.reportTable}>
        <CommonBasicInfo
          editing={this.props.editing}
          basicInfo={this.props.basicInfo}
          userReport={this.props.userReport}
          dispatch={this.props.dispatch}
          changeHistory={() => this.props.changeHistory()}
          showHistory={this.props.showHistory}
          visibleModal={() => this.props.visibleModal()}
          visible={this.props.visible}
          moudleIds={this.props.moudleIds}
          paramsId={this.props.paramsId}
        />
        {this.props.Component || <div />}
        <CommonReportInfo
          id={this.props.params.id}
          editing={this.props.editing}
          changeAction={this.props.changeAction}
          frontCoverData={this.props.frontCoverData}
          basicInfo={this.props.basicInfo}
        />
      </View>
    );
  }
}

export default PCReportHome;
