
import React, { PropTypes } from 'react';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/Common.css';
import Immutable from 'immutable';
import { showCancel } from '../../core/FormValidate/CancelOk';
import { modifyButton, confirmButton, SubmitButton, cancelButton, revertButton }
 from '../../core/CommonFun/ButtonCommon';

const UserInfoHeader = (props) => {
  const handleSubmit = (actionName) => {
    props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }
      actionName(props.params);
    });
  };
  const _renderTitle = () => {
    if (props.id) {
      if (props.editing) {
        return (
          <View>{`修改活动内容  ID: ${props.id}`}</View>
        );
      }
      return (
        <View>{`活动详情  ID: ${props.id}`}</View>
      );
    }
    return false;
  };
  const _rednerBtn = () => {
    if (props.id) {
      if (props.editing) {
        return confirmButton(handleSubmit)(props.updateAction);
      }
      return modifyButton(props.goUpdateAction)(props.id);
    }
    return false;
  };
  const _returnBtn = () => {
    if (props.id && !props.editing) {
      return revertButton(props.goBackAction)();
    }
    return cancelButton(showCancel)(props.goBackAction, props.id, props.params);
  };
  return (
    <View>
      <View className={ styles.contentHeader }>
        <View className={ styles.contentText }>
          {_renderTitle()}
        </View>
        <View className={ styles.contentButton }>
          {_rednerBtn()}
          {_returnBtn()}
        </View>
      </View>
    </View>
  );
};

UserInfoHeader.propTypes = {
  id: PropTypes.string,
  form: PropTypes.any,
  params: PropTypes.object,
  editing: PropTypes.string,
  goBackAction: PropTypes.func.isRequired,
  goUpdateAction: PropTypes.func.isRequired,
  updateAction: PropTypes.func.isRequired,
};

export default UserInfoHeader;
