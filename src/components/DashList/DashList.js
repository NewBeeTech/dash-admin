
import React, { PropTypes } from 'react';
import DashListHeader from './DashListHeader';
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
    dispatch: PropTypes.func,
  };
  componentWillMount() {
    // this.props.dispatch(DashAction.getDashList());
  }
  _goCreateAction = (dispatch: Function) => () => {
    dispatch(push(RoutingURL.DashInfo()));
  }
  render() {
    return (
      <View className={ styles.contentList } >
        <View className={ styles.contentListHeader } >
          <DashListHeader
            goCreateAction={this._goCreateAction(this.props.dispatch)}
          />
        </View>
        <View className={ styles.contentListContent } >
          <View className={ styles.contentListTable } >
             <DashListTable
                 dataSource={this.props.dashList.get('dashListData')}
                 dispatch={this.props.dispatch}
             />
          </View>
          <View className={ styles.pageNav }>
            <PageNav
              pageSize={10}
              total={this.props.dashList.get('total')}
              params={[]}
              current={this.props.dashList.get('currentPage')}
              searchAction={() => console.log(111)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default DashList;