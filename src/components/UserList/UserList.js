
import React, { PropTypes } from 'react';
import UserListHeader from './UserListHeader';
import UserListTable from './UserListTable';
import PageNav from '../../common/PageNav';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import * as styles from '../../assets/stylesheets/Common.css';
import * as UserAction from '../../actions/UserAction';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import amumu from 'amumu';

@amumu.redux.ConnectStore
@amumu.decorators.Loading('pc')
class UserList extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    errMsg: PropTypes.string.isRequired,
    userList: PropTypes.instanceOf(Immutable.Map).isRequired,
    dispatch: PropTypes.func,
  };
  componentWillMount() {
    // this.props.dispatch(UserAction.getUserList());
  }
  render() {
    return (
      <View className={ styles.contentList } >
        <View className={ styles.contentListHeader } >
          <UserListHeader />
        </View>
        <View className={ styles.contentListContent } >
          <View className={ styles.contentListTable } >
             <UserListTable
                 dataSource={this.props.userList.get('userListData')}
                 dispatch={this.props.dispatch}
             />
          </View>
          <View className={ styles.pageNav }>
            <PageNav
              pageSize={10}
              total={this.props.userList.get('total')}
              params={[]}
              current={this.props.userList.get('currentPage')}
              searchAction={() => console.log(111)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default UserList;
