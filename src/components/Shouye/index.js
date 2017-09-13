
import React, { PropTypes } from 'react';

const Shouye = (props) => {
  return (
    <View className={ styles.login }>
      登录首页
    </View>
  );
};
Shouye.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Shouye;
