import React, { PropTypes } from 'react';
import styles from '../../assets/stylesheets/HealthReport/dietReport.css';

class WebSuggestion extends React.Component {
  static propTypes = {
    suggestions: PropTypes.string,
    title: PropTypes.string,
    imgUrl: PropTypes.string,
    bottomInscribe: PropTypes.string,
    bottomInscribeName: PropTypes.string,
  };
  render() {
    return (
      <div className={styles.homeBg}>
        {/* <div className={styles.foodsTop}>
          <img src={this.props.imgUrl} className={styles.foodsTopImg} />
          <div className={styles.foodsTopDiv}>{this.props.title}</div> */}
        <div
          className={styles.commonfoodsTop}
          style={{ backgroundImage: `url(${this.props.imgUrl})`, backgroundSize: 'cover' }}
        >
          {this.props.title}
        </div>
        <div className={styles.adviceLine} />
        <div className={styles.suggestion}>
          <pre className={styles.suContent1}>
            {this.props.suggestions}
          </pre>
          <div className={styles.inscribe}>
            <div className={styles.inscribeReportTo}>
              亿心蓝盾{this.props.bottomInscribe}
            </div>
            <div className={styles.inscribeName}>
              {this.props.bottomInscribeName}
              服务分组
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WebSuggestion;
