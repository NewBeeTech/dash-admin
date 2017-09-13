import React, { PropTypes } from 'react';
import styles from '../../assets/stylesheets/HealthReport/dietReport.css';
import shallowCompare from 'react-addons-shallow-compare';
import { Icon } from 'antd';

class ReportPageNav extends React.Component {
  static propTypes = {
    total: PropTypes.number,
    current: PropTypes.number,
    previousPageActon: PropTypes.func,
    nextPageAction: PropTypes.func,
    allowMoudleIds: PropTypes.array,
    allModules: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    const disableStyle = { color: '#999' };
    const disableBorder = { borderColor: '#999' };
    const index = this.props.allModules[this.props.current];
    const currentIndex = this.props.allowMoudleIds.indexOf(index);
    return (
      <div className={ styles.webPage}>
        <div
          onClick={() => this.props.previousPageActon(this.props.current)}
          className={styles.pageArrow}
          style={currentIndex === 0 ? disableBorder : {}}
        ><Icon type="left" /></div>
        <span style={currentIndex === 0 ? disableStyle : {}}>
            {currentIndex + 1}
          </span>
           &nbsp;/&nbsp;
          <span style={currentIndex === this.props.total - 1 ? disableStyle : {}}>
            {this.props.total}
          </span>
        <div
          onClick={() => this.props.nextPageAction(this.props.current)}
          className={styles.pageArrow}
          style={currentIndex === this.props.total - 1 ? disableBorder : {}}
        ><Icon type="right" /></div>
      </div>
    );
  }
}

export default ReportPageNav;
