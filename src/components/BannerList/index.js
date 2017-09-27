
import { connect } from 'react-redux';
import BannerList from './BannerList';

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  errMsg: state.BannerReducer.get('errMsg'),
  isFetching: state.BannerReducer.get('isFetching'),
  bannerList: state.BannerReducer.get('bannerList'),
});

export default connect(mapStateToProps)(BannerList);