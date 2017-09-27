/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import BannerHeader from './BannerHeader';
import BannerListTable from './BannerListTable';
import PageNav from '../../common/PageNav';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as styles from '../../assets/stylesheets/Common.css';
import * as BannerAction from '../../actions/BannerAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import amumu from 'amumu';

@amumu.redux.ConnectStore
@amumu.decorators.Loading('pc')
class BannerList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    bannerList: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func,
  };
  componentWillMount() {
    // this.props.dispatch(BannerAction.getBannerList());
  }
  _goCreateAction = (dispatch: Function) => () => {
    dispatch(push(RoutingURL.Banner()));
  }
  render() {
    return (
      <View className={ styles.contentList } >
        <View className={ styles.contentListHeader } >
          <BannerHeader
            goCreateAction={this._goCreateAction(this.props.dispatch)}
          />
        </View>
        <View className={ styles.contentListContent } >
          <View className={ styles.contentListTable } >
             <BannerListTable
                 dataSource={this.props.bannerList.get('bannerListData')}
                 dispatch={this.props.dispatch}
             />
          </View>
          <View className={ styles.pageNav }>
            <PageNav
              pageSize={10}
              total={this.props.bannerList.get('total')}
              params={[]}
              current={this.props.bannerList.get('currentPage')}
              searchAction={() => console.log(111)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default BannerList;
