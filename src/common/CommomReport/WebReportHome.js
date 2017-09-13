import React, { PropTypes } from 'react';
import styles from '../../assets/stylesheets/HealthReport/dietReport.css';
import reportStyles from '../../assets/stylesheets/Report/report.css';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';

class Home extends React.Component {
  static propTypes = {
    reportTo: PropTypes.string, // 报告单位
    reportIdentifier: PropTypes.number, // 报告编号
    name: PropTypes.string, // 姓名
    reportType: PropTypes.string, // 报告类型
    reportTime: PropTypes.string, // 报告时间
    Component: PropTypes.any,
    style: PropTypes.object,
  };
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  showHomeBody() {
    const Components = this.props.Component;
    if (Components) {
      return Components;
    }
    return '';
  }
  render() {
    return (
      <div className={styles.homeBg} style={this.props.style}>
        <div className={styles.homeTop}>
          <div className={styles.homeTopLogo} />
          <div className={styles.homeTopText}>
            <div>
              {this.props.reportTo}
            </div>
            <div style={{ marginTop: '2px' }}>
              {this.props.reportIdentifier}
            </div>
          </div>
        </div>
        {this.showHomeBody()}
        {/* <div className={reportStyles.homeImg}>
          <img
            className={reportStyles.homeImgBig}
            src={this.props.src || imgRUL.singleBanner}
          />
          {this.props.foodName ?
            <div className={reportStyles.homeImgSmall}>
              <img
                className={reportStyles.homeSingleImg}
                src={this.props.foodSrc || imgRUL.defaultSingle}
              />
              <div className={reportStyles.homeSingleName}>
                {this.props.foodName || '食物名称'}</div>
            </div> : ''}
        </div> */}
        <div className={reportStyles.homeBottom}>
          <div className={reportStyles.homeBottomRight}>
            <div>
              姓名&nbsp;&nbsp;{this.props.name}
            </div><br />
            <div>
              类型&nbsp;&nbsp;
              {this.props.reportType}
            </div><br />
            <div>
              时间&nbsp;&nbsp;
              {moment(this.props.reportTime).format('YYYY.MM.DD')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
