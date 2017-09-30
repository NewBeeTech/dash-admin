
import React, { PropTypes } from 'react';
import DashListHeader from './DashListHeader';
import DashListSearch from './DashListSearch';
import DashListTable from './DashListTable';
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
class DashList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    dashList: PropTypes.instanceOf(Immutable.Map).isRequired,
    searchData: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func,
  };
  componentWillMount() {
    this.props.dispatch(DashAction.getDashList(
      { pageNum: this.props.searchData.get('pageNum'), pageSize: this.props.searchData.get('pageSize') }
    ));
  }
  _goCreateAction = (dispatch: Function) => () => {
    dispatch(push(RoutingURL.DashInfo()));
  }
  _goDeleteAction = (dispatch: Function) => (params) => {
    const localParams = Object.assign(params, { pageNum: this.props.searchData.get('pageNum'), pageSize: this.props.searchData.get('pageSize') });
    dispatch(DashAction.deleteDash(localParams));
  }
  _searchAction = (dispatch: Function) => (params: {}, current = 1) => {
    const localParams = Object.assign(params, { pageNum: current, pageSize: this.props.searchData.get('pageSize') });
    this.props.dispatch(DashAction.getDashList(localParams));
    this.props.changeAction('DashReducer/searchData/pageNum', current);
  };
  render() {
    return (
      <View className={ styles.contentList } >
        <View className={ styles.contentListHeader } >
          <DashListHeader
            goCreateAction={this._goCreateAction(this.props.dispatch)}
          />
        </View>
        <View className={ styles.contentListContent } >
          <View className={ styles.contentListSearch } >
              <DashListSearch
                searchAction={this._searchAction(this.props.dispatch)}
                searchData={this.props.searchData}
              />
            </View>
          <View className={ styles.contentListTable } >
             <DashListTable
                 dataSource={this.props.dashList.get('dashListData')}
                 goDeleteAction={this._goDeleteAction(this.props.dispatch)}
                 dispatch={this.props.dispatch}
             />
          </View>
          <View className={ styles.pageNav }>
            <PageNav
              pageSize={this.props.searchData.get('pageSize')}
              total={Number(this.props.dashList.get('total'))}
              params={this.props.searchData.toJS()}
              current={this.props.searchData.get('pageNum')}
              searchAction={this._searchAction(this.props.dispatch)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default DashList;
