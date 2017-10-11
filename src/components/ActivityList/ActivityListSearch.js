
import React, { PropTypes } from 'react';
import { Form, Input, Button, Col, Row, Select } from 'antd';
import Immutable from 'immutable';
import mainStyles from '../../assets/stylesheets/Common.css';
import amumu from 'amumu';

const FormItem = Form.Item;
const Option = Select.Option;

@amumu.decorators.PureComponent
@amumu.redux.ConnectStore
class ActivityListSearch extends React.Component {
  static propTypes = {
    searchAction: PropTypes.func.isRequired,
    form: PropTypes.any,
    bindReducer: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    searchData1: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  componentWillMount() {
    this.searchData();
  }
  searchData() {
    if (this.props.searchData1.count() > 1) {
      const dataSource1 = this.props.searchData1;
      return this.props.form.setFieldsValue({
        statusList: dataSource1.get('statusList'),
      });
    }
    return false;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form
        horizontal
        className="advanced-search-form"
      >
        <Row>
          <Col span="8" >
            <FormItem
              label="状态："
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                  initialValue: this.props.searchData1.get('statusList'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/searchData1/statusList', e);
                  },
                })(
                  <Select
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={false}
                  >
                    <Option value={''}>全部</Option>
                    <Option value={'1,4,5'}>没问题订单</Option>
                    <Option value={'2,3'}>有问题订单</Option>
                  </Select>
              )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="活动ID："
              {...formItemLayout}
            >
              {getFieldDecorator('activityId', {
                  initialValue: this.props.searchData1.get('activityId'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/searchData1/activityId', e.target.value);
                  },
                })(
                  <Input />
              )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="活动名称："
              {...formItemLayout}
            >
              {getFieldDecorator('activityName', {
                  initialValue: this.props.searchData1.get('activityName'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/searchData1/activityName', e.target.value);
                  },
                })(
                  <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }} >
          <Col span="13" offset="10" style={{ textAlign: 'right' }} >
            <Button
              style={{ marginRight: '20px' }}
              className={ mainStyles.blueButton }
              type="primary"
              htmlType="submit"
              onClick={() => {
                this.props.searchAction(this.props.searchData1.toJS(), this.props.searchData1.get('pageNum'));
              }}
            >
              筛选</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(ActivityListSearch);
