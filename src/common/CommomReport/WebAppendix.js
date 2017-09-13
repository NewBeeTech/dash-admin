import React, { PropTypes } from 'react';
import styles from '../../assets/stylesheets/HealthReport/dietReport.css';

class WebAppendix extends React.PureComponent {
  static propTypes = {
    bibliographies: PropTypes.string,
    imgUrl: PropTypes.string,
  };
  render() {
    return (
      <div className={styles.homeBg}>
        <div className={styles.foodsTop}>
          <img src={this.props.imgUrl} className={styles.foodsTopImg} />
          <div className={styles.foodsTopDiv}>附录：参考文献来源</div>
        </div>
        <div className={styles.adviceLine} />
        <div className={styles.suggestion}>
          <pre className={styles.suContent} style={{ background: 'none', border: 'none' }}>
            {this.props.bibliographies}
          </pre>
        </div>
      </div>
    );
  }
}

export default WebAppendix;
