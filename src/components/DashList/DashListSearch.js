
import React, { PropTypes } from 'react';
import { Form, Input, Button, Col, Row, Select } from 'antd';
import Immutable from 'immutable';
import mainStyles from '../../assets/stylesheets/Common.css';
import amumu from 'amumu';

const FormItem = Form.Item;
const Option = Select.Option;

@amumu.decorators.PureComponent
@amumu.redux.ConnectStore
class DashListSearch extends React.Component {
  static propTypes = {
    searchAction: PropTypes.func.isRequired,
    form: PropTypes.any,
    bindReducer: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    searchData: PropTypes.instanceOf(Immutable.Map).isRequired,
  };
  componentWillMount() {
    this.searchData();
  }
  searchData() {
    if (this.props.searchData.count() > 1) {
      const dataSource1 = this.props.searchData;
      return this.props.form.setFieldsValue({
        id: dataSource1.get('id'),
        name: dataSource1.get('name'),
        status: dataSource1.get('status'),
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
              label="活动ID："
              {...formItemLayout}
            >
              {getFieldDecorator('id', {
                  initialValue: this.props.searchData.get('id'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/searchData/id', e.target.value);
                  },
                })(
                <Input
                  placeholder="ID"
                />
              )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="标题："
              {...formItemLayout}
            >
            {getFieldDecorator('name', {
                initialValue: this.props.searchData.get('name'),
                onChange: (e) => {
                  this.props.changeAction(
                  'DashReducer/searchData/name', e.target.value);
                },
              })(
              <Input
                placeholder="标题"
              />
            )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="状态："
              {...formItemLayout}
            >
              {getFieldDecorator('status', {
                  initialValue: this.props.searchData.get('status'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'DashReducer/searchData/status', e);
                  },
                })(
                  <Select
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={false}
                  >
                    <Option value={''}>全部</Option>
                    <Option value={0}>下架</Option>
                    <Option value={1}>上架</Option>
                  </Select>
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
                this.props.searchAction(this.props.searchData.toJS(), this.props.searchData.get('pageNum'));
              }}
            >
              筛选</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(DashListSearch);
