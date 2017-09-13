/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/ContentStyle/ContentDetail.css';
import type { Dispatch } from '../../actions/types';
import { Input, Icon, Form } from 'antd';
import moment from 'moment';

type Props = {
  editing: boolean,
  frontCoverData: Immutable.Map<string, any>,
  basicInfo: Immutable.Map<string, any>,
  changeAction: Function,
  form: Function,
  id: number | string,
};

const FormItem = Form.Item;

class ReportInfo extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    frontCoverData: PropTypes.instanceOf(Immutable.Map),
    basicInfo: PropTypes.instanceOf(Immutable.Map),
    changeAction: PropTypes.func.isRequired,
    form: PropTypes.any,
    id: PropTypes.any,
  };

  props: Props;
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      // <View className={styles.reportTable}>
        <View className={styles.basicTable}>
          <FormItem
            {...formItemLayout}
            label="报告单位"
            hasFeedback
            style={{ marginTop: '20px' }}
          >
            {
             !this.props.editing ?
             this.props.frontCoverData.get('reportTo') :
             getFieldDecorator('reportTo', {
               rules: [{
                 required: true, message: '请输入报告单位',
               }],
               initialValue: this.props.frontCoverData.get('reportTo'),
               onChange: (e) => this.props.changeAction(e.target.value, 'reportTo'),
             })(
               <Input addonBefore={<Icon type="team" />} />
             )
            }

          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告编号"
            hasFeedback
          >
            {this.props.frontCoverData.get('reportIdentifier')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告名称"
            hasFeedback
          >
          {
           !this.props.editing ?
           this.props.frontCoverData.get('reportName') :
           getFieldDecorator('reportName', {
             rules: [{
               required: true, message: '请输入报告名称',
             }],
             initialValue: this.props.frontCoverData.get('reportName'),
             onChange: (e) => this.props.changeAction(e.target.value, 'reportName'),
           })(
             <Input addonBefore={<Icon type="file-text" />} />
           )
          }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="患者姓名"
            hasFeedback
          >
            {
             !this.props.editing ?
             this.props.frontCoverData.get('name') || this.props.basicInfo.get('name') :
             getFieldDecorator('name', {
               rules: [{
                 required: true, message: '请输入患者姓名',
               }],
               initialValue: this.props.frontCoverData.get('name') ||
               this.props.basicInfo.get('name'),
               onChange: (e) => this.props.changeAction(e.target.value, 'name'),
             })(
               <Input addonBefore={<Icon type="user" />} />
             )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="报告类型"
            hasFeedback
          >
          {this.props.frontCoverData.get('reportType')}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="评估日期"
            hasFeedback
          >
          {
           this.props.id ? moment(this.props.frontCoverData.get('reportTime')).format('YYYY.MM.DD')
           : moment().format('YYYY.MM.DD')
          }
          </FormItem>
        </View>
      // </View>
    );
  }
}

export default Form.create()(ReportInfo);
