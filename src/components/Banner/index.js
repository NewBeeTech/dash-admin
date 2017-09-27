
import { connect } from 'react-redux';
import Banner from './Banner';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.BannerReducer.get('errMsg'),
  isFetching: state.BannerReducer.get('isFetching'),
  bannerInfo: state.BannerReducer.get('bannerInfo'),
});

export default connect(mapStateToProps)(Banner);