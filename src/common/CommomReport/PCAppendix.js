/*
@flow
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import styles from '../../assets/stylesheets/ContentStyle/ContentDetail.css';
import { Input, Form } from 'antd';
import CommonBasicInfo from './CommonBasicInfo';

type Props = {
  basicInfo: Immutable.Map<string, any>,
  editing: boolean,
  id: string | number,
  changeAppendixAction: Function,
  form: Object,
  bibliographies: string,
};

const FormItem = Form.Item;

class Appendix extends React.Component {
  static propTypes = {
    basicInfo: PropTypes.instanceOf(Immutable.Map),
    bibliographies: PropTypes.string,
    id: PropTypes.any,
    editing: PropTypes.bool,
    form: PropTypes.object,
    changeAppendixAction: PropTypes.func.isRequired,
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
            label="附录：参看文献来源："
            hasFeedback
          >
          {
           getFieldDecorator('bibliographies', {
             rules: [{
               required: true, message: '请输入附录：参看文献来源',
             }],
             initialValue: this.props.bibliographies,
             onChange: (e) => this.props.changeAppendixAction(e),
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

export default Form.create()(Appendix);
