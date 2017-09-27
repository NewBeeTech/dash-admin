
import { connect } from 'react-redux';
import DashList from './DashList';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.DashReducer.get('errMsg'),
  isFetching: state.DashReducer.get('isFetching'),
  dashList: state.DashReducer.get('dashList'),
});

export default connect(mapStateToProps)(DashList);