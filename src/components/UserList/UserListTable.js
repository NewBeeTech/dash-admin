
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
      title: '昵称',
      dataIndex: 'wxName',
      key: 'wxName',
    }, {
      title: '头像',
      dataIndex: 'wxPortrait',
      key: 'wxPortrait',
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '喜欢数',
      dataIndex: 'likeCount',
      key: 'likeCount',
    }, {
      title: '标签',
      dataIndex: 'tags',
      width: '20%',
      key: 'tags',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      const sex = data.get('sex');
      dataSource.push({
        key: index,
        id: data.get('id'),
        wxName: data.get('wxName'),
        wxPortrait: this.showImg(data.get('wxPortrait')),
        age: data.get('age'),
        sex: sex ? (sex == 1 ? '男' : '女') : '未知',
        status: data.get('status') ? '正常' : '屏蔽',
        likeCount: data.get('likeCount'),
        phone: data.get('phone'),
        tags: data.get('tags'),
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
    }
    return dataSource;
  }
  showImg(img) {
    const views = [];
    if(img) {
      views.push(
        <img src={img} style={{ height: '40px', width: '40px' }} />
      );
    }
    return views;
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
