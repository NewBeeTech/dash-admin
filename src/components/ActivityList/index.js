
import { connect } from 'react-redux';
import ActivityList from './ActivityList';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.DashReducer.get('errMsg'),
  isFetching: state.DashReducer.get('isFetching'),
  activityList: state.DashReducer.get('activityList'),
  searchData1: state.DashReducer.get('searchData1'),
});

export default connect(mapStateToProps)(ActivityList);