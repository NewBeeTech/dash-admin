
import React, { PropTypes } from 'react';
import { Form, Input, Button, Col, Row, Select } from 'antd';
import Immutable from 'immutable';
import mainStyles from '../../assets/stylesheets/Common.css';
import amumu from 'amumu';

const FormItem = Form.Item;
const Option = Select.Option;

@amumu.decorators.PureComponent
@amumu.redux.ConnectStore
class UserListSearch extends React.Component {
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
        sex: dataSource1.get('sex'),
        wxName: dataSource1.get('wxName'),
        phone: dataSource1.get('phone'),
        tags: dataSource1.get('tags'),
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
              label="用户ID："
              {...formItemLayout}
            >
              {getFieldDecorator('id', {
                  initialValue: this.props.searchData.get('id'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'UserReducer/searchData/id', e.target.value);
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
              label="微信昵称："
              {...formItemLayout}
            >
              {getFieldDecorator('wxName', {
                  initialValue: this.props.searchData.get('wxName'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'UserReducer/searchData/wxName', e.target.value);
                  },
                })(
                <Input
                  placeholder="微信昵称"
                />
              )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="手机号："
              {...formItemLayout}
            >
              {getFieldDecorator('phone', {
                  initialValue: this.props.searchData.get('phone'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'UserReducer/searchData/phone', e.target.value);
                  },
                })(
                <Input
                  placeholder="手机号"
                />
              )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="用户标签："
              {...formItemLayout}
            >
              {getFieldDecorator('tags', {
                  initialValue: this.props.searchData.get('tags'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'UserReducer/searchData/tags', e.target.value);
                  },
                })(
                <Input
                  placeholder="用户标签"
                />
              )}
            </FormItem>
          </Col>
          <Col span="8" >
            <FormItem
              label="性别："
              {...formItemLayout}
            >
              {getFieldDecorator('sex', {
                  initialValue: this.props.searchData.get('sex'),
                  onChange: (e) => {
                    this.props.changeAction(
                    'UserReducer/searchData/sex', e);
                  },
                })(
                  <Select
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={false}
                  >
                    <Option value="" >全部</Option>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
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
                this.props.searchAction(this.props.searchData.toJS());
              }}
            >
              筛选</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(UserListSearch);
