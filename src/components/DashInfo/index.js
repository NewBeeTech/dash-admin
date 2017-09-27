
import { connect } from 'react-redux';
import DashInfo from './DashInfo';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.DashReducer.get('errMsg'),
  isFetching: state.DashReducer.get('isFetching'),
  dashInfo: state.DashReducer.get('dashInfo'),
});

export default connect(mapStateToProps)(DashInfo);