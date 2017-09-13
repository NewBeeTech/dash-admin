/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/ContentStyle/ContentDetail.css';
import type { Dispatch } from '../../actions/types';
import { Input, Form } from 'antd';
import CommonBasicInfo from './CommonBasicInfo';

type Props = {
  basicInfo: Immutable.Map<string, any>,
  id: number | string,
  editing: boolean,
  suggestions: string,
  title: string,
  form: Object,
  changeSuggesstionAction: Function,
};

const FormItem = Form.Item;

class PCSuggesstion extends React.Component {
  static propTypes = {
    basicInfo: PropTypes.instanceOf(Immutable.Map),
    suggestions: PropTypes.string,
    title: PropTypes.string, // 膳食管理顾问建议
    form: PropTypes.object,
    changeSuggesstionAction: PropTypes.func,
    editing: PropTypes.bool,
  };
  props: Props;

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <View className={styles.reportTable}>
        <CommonBasicInfo
          basicInfo={this.props.basicInfo}
          changeHistory={() => this.props.changeHistory()}
          showHistory={this.props.showHistory}
          userReport={this.props.userReport}
          visibleModal={() => this.props.visibleModal()}
          visible={this.props.visible}
          paramsId={this.props.paramsId}
        />
        <View style={{ height: '350px', marginTop: '20px' }}>
          <FormItem
            label={this.props.title}
            hasFeedback
          >
          {
           getFieldDecorator('suggestions', {
             rules: [{
               required: true, message: '请输入膳食管理顾问建议',
             }],
             initialValue: this.props.suggestions,
             onChange: (e) => this.props.changeSuggesstionAction(e),
           })(
             <Input type="textarea" readOnly={!this.props.editing} rows={15} width="90%" />
           )
          }
          </FormItem>
        </View>
      </View>
    );
  }
}

export default Form.create()(PCSuggesstion);
