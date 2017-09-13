/**
 * Created by leiyouwho on 11/4/2016.
 */

import React from 'react';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/Menus/Menus.css';

const MenuHeader = () => {
  return (
    <View className={styles.MenusHeaderContainer}>
      <View className={styles.sloganContainer}>
        <View className={styles.sloganTitle}>Dash</View>
        <View className={styles.sloganSubtitle}>后台运营管理系统</View>
      </View>
    </View>
  );
};

export default MenuHeader;
