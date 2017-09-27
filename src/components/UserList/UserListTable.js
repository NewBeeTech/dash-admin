
import React, { PropTypes } from 'react';
import { Table, Popconfirm } from 'antd';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import styles from '../../assets/stylesheets/Common.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';

const propTypes = {
  dataSource: PropTypes.instanceOf(Immutable.List).isRequired,
  dispatch: PropTypes.func,
};

class UserListTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
    }, {
      title: '用户id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '用户微信头像',
      dataIndex: 'portrait',
      key: 'portrait',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '收到橄榄枝的数量',
      dataIndex: 'likeCount',
      key: 'likeCount',
    },{
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        id: data.get('id'),
        nickName: data.get('nickName'),
        portrait: data.get('portrait'),
        age: data.get('age'),
        sex: data.get('sex'),
        status: data.get('status') ? '正常' : '屏蔽',
        likeCount: data.get('likeCount'),
        phone: data.get('phone'),
        operation: (
          <View>
            <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.UserInfo(data.get('id'))));
              }}
            >
              查看
            </a> | <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.UserInfo(data.get('id'), true)));
              }}
            >
              编辑
            </a>
          </View>
        ),
      });
    });
    return dataSource;
  }

  render() {
    return (
      <View>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.dataSource)}
          pagination={false}
          bordered
          rowClassName={(record, index) => {
            if (index % 2 === 0) {
              return styles.rowColor;
            }
          }}
        />
      </View>
    );
  }
}
UserListTable.propTypes = propTypes;

export default UserListTable;
