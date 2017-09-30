/**
 * Created by wanglu on 7/4/2016.
 */

import React, { PropTypes } from 'react';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/Common.css';
import mainStyles from '../../assets/stylesheets/Common.css';

const ActivityListHeader = (props) => {
  return (
    <View className={ styles.contentHeader }>
      <View className={ styles.contentText }>
        报名活动列表
      </View>
    </View>
  );
};

ActivityListHeader.propTypes = {
};

export default ActivityListHeader;
