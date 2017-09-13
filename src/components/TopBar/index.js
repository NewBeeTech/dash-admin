import TopBar from './TopBar';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  userName: state.UserReducer.get('userName'),
});


export default connect(mapStateToProps)(TopBar);
