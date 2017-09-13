/**
 * @flow weak
 */
import React, { PropTypes } from 'react';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/ContentStyle/ContentHeader.css';
import { showCancel } from '../../core/FormValidate/CancelOk';
import { modifyButton, confirmButton, SubmitButton, cancelButton, revertButton }
from '../../core/CommonFun/ButtonCommon';
import { Button, Popconfirm, Form } from 'antd';
import mainStyles from '../../assets/stylesheets/main.scss';

const ReportInfoHeader = (props: Object) => {
  // 提交
  const handleSubmit = (actionName: Function) => {
    // actionName();
    props.form.validateFields((errors) => {
      console.log(errors);
      if (!!errors) {
        return;
      }
      // console.log('params: ', props.params);
      actionName(props.params);
    });
  };
  const _renderTitle = () => {
    return (
      <View>健康报告详情</View>
    );
  };
  const _renderBtn = () => {
    if (props.id) {
      if (props.editing) {
        return confirmButton(handleSubmit)(props.createReportAction, '保存修改');
      }
      if ([2, 4].indexOf(props.status) > -1) {
        return (
          <span>
            <Popconfirm title="选择发送方式"
              onConfirm={() => props.sendReportAction({ reportId: props.id, delay: true })}
              onCancel={() => props.sendReportAction({ reportId: props.id, delay: false })}
              okText="延迟30分钟发送"
              cancelText="立即发送"
            >
              <Button
                className={ mainStyles.blueButton }
                type="primary"
                style={{ marginRight: '10px' }}
              >
                发送
              </Button>
            </Popconfirm>
            {props.status === 2 ? modifyButton(props.routeModify)(props.id) : ''}
          </span>
        );
      }
      if ([1, 2].indexOf(props.status) > -1) {
        return (
          <Button
            className={ mainStyles.blueButton }
            type="primary"
            onClick={() => {
              if (props.status === 1) {
                props.getBibliographyAction({ reportType: props.reportType });
              }
              props.routeModify(props.id);
            }}
          >
            修改
          </Button>
        );
        // return modifyButton(props.routeModify)(props.id);
      }
      return false;
    }
    return SubmitButton(handleSubmit)(props.createReportAction);
  };
  const _returnBtn = () => {
    if (props.id && !props.editing) {
      return revertButton(props.routeBack)();
    }
    return cancelButton(showCancel)(props.routeBack, props.id, props.params);
  };
  const _renderSendBtn = () => {
    if (props.id) {
      if (props.editing) {
        return (
          <Popconfirm title="请选择发送方式"
            onConfirm={() => props.createReportAction('delay')}
            onCancel={() => props.createReportAction('send')}
            okText="延迟30分钟发送"
            cancelText="立即发送"
          >
            <Button
              className={ mainStyles.blueButton }
              type="primary"
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              保存并发送
            </Button>
          </Popconfirm>
        );
        // confirmButton(handleSubmit)(props.routeBack, '保存并发送');
      }
    }
    return false;
  };
  return (
    <View>
      <View className={ styles.contentHeader }>
        <View className={ styles.contentText }>
          {_renderTitle()}
        </View>
        <View className={ styles.contentButton }>
          {_renderBtn()}
          {_returnBtn()}
          {_renderSendBtn()}
        </View>
      </View>
    </View>
  );
};

ReportInfoHeader.propTypes = {
  id: PropTypes.number,
  editing: PropTypes.bool,
  routeBack: PropTypes.func,
  routeModify: PropTypes.func,
  params: PropTypes.object,
  createReportAction: PropTypes.func,
  sendReportAction: PropTypes.func,
  form: PropTypes.object,
  status: PropTypes.any,
  getBibliographyAction: PropTypes.any,
  reportType: PropTypes.number,
};

export default Form.create()(ReportInfoHeader);
