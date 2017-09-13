import Menus from './Menus';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  // roleValues: state.UserReducer.get('roleValues'),
});

export default connect(mapStateToProps)(Menus);
