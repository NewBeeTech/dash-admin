
import { connect } from 'react-redux';
import UserList from './UserList';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.UserReducer.get('errMsg'),
  isFetching: state.UserReducer.get('isFetching'),
  userList: state.UserReducer.get('userList'),
  searchData: state.UserReducer.get('searchData'),
});

export default connect(mapStateToProps)(UserList);