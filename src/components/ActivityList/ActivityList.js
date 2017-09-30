
import React, { PropTypes } from 'react';
import ActivityListHeader from './ActivityListHeader';
import ActivityListSearch from './ActivityListSearch';
import ActivityListTable from './ActivityListTable';
import PageNav from '../../common/PageNav';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as styles from '../../assets/stylesheets/Common.css';
import * as DashAction from '../../actions/DashAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import amumu from 'amumu';

@amumu.redux.ConnectStore
@amumu.decorators.Loading('pc')
class ActivityList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    ActivityList: PropTypes.instanceOf(Immutable.Map).isRequired,
    searchData1: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func,
  };
  componentWillMount() {
    this.props.dispatch(DashAction.getActivityList(
      { pageNum: this.props.searchData1.get('pageNum'), pageSize: this.props.searchData1.get('pageSize') }
    ));
  }
  _changeStatusAction = (dispatch: Function) => (params) => {
    const localParams = Object.assign(params, { pageNum: this.props.searchData1.get('pageNum'), pageSize: this.props.searchData1.get('pageSize') });
    dispatch(DashAction.changeStatus(localParams));
  }
  _searchAction = (dispatch: Function) => (params: {}, current = 1) => {
    const localParams = Object.assign(params, { pageNum: current, pageSize: this.props.searchData1.get('pageSize') });
    this.props.dispatch(DashAction.getActivityList(localParams));
    this.props.changeAction('DashReducer/searchData1/pageNum', current);
  };
  render() {
    return (
      <View className={ styles.contentList } >
        <View className={ styles.contentListHeader } >
          <ActivityListHeader
          />
        </View>
        <View className={ styles.contentListContent } >
          <View className={ styles.contentListSearch } >
              <ActivityListSearch
                searchAction={this._searchAction(this.props.dispatch)}
                searchData1={this.props.searchData1}
              />
            </View>
          <View className={ styles.contentListTable } >
             <ActivityListTable
                 dataSource={this.props.activityList.get('activityListData')}
                 changeStatusAction={this._changeStatusAction(this.props.dispatch)}
                 dispatch={this.props.dispatch}
             />
          </View>
          <View className={ styles.pageNav }>
            <PageNav
              pageSize={this.props.searchData1.get('pageSize')}
              total={Number(this.props.activityList.get('total'))}
              params={this.props.searchData1.toJS()}
              current={this.props.searchData1.get('pageNum')}
              searchAction={this._searchAction(this.props.dispatch)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ActivityList;
