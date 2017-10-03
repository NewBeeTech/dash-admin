
import React, { PropTypes } from 'react';
import { Table, Popconfirm } from 'antd';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import styles from '../../assets/stylesheets/Common.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import { getActivityTime } from '../../core/CommonFun/moment';

const propTypes = {
  dataSource: PropTypes.instanceOf(Immutable.List),
  dispatch: PropTypes.func,
  changeStatusAction: PropTypes.func,
};

class ActivityListTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
    }, {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'pingxxId',
      dataIndex: 'pingxxId',
      key: 'pingxxId',
    }, {
      title: '活动ID',
      dataIndex: 'activityId',
      key: 'activityId',
    }, {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
    }, {
      title: '活动时间',
      dataIndex: 'activityTime',
      key: 'activityTime',
    }, {
      title: 'orderId',
      dataIndex: 'orderId',
      key: 'orderId',
    }, {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '性别',
      dataIndex: 'var1',
      key: 'var1',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
  }
  getStatus(status) {
    let text = '';
    if(status == 0) {
      text = '失败';
    }
    if(status == 1) {
      text = '成功';
    }
    if(status == 2) {
      text = '问题订单';
    }
    if(status == 3) {
      text = '用户取消';
    }
    return text;
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas){
    datas.forEach((data, index) => {
      const sex = data.get('var1');
      dataSource.push({
        key: index,
        id: data.get('id'),
        pingxxId: data.get('pingxxId'),
        activityId: data.get('activityId'),
        activityName: data.get('activityName'),
        activityTime: `${data.get('startTime')}-${data.get('endTime')}`,
        orderId: data.get('orderId'),
        userId: data.get('userId'),
        var1: sex ? (sex == 1 ? '男' : '女') : '未知',
        status: this.getStatus(data.get('status')),
        operation: (
          <View>
            <Popconfirm
              title="确认要拒绝?"
              okText="确认拒绝"
              cancelText="取消"
              onConfirm={() => this.props.changeStatusAction({id: data.get('id'), status: 2 })}
            >
              <a
                style={{ color: '#FF7316' }}
                href="#"
              >
                标记问题
              </a>
            </Popconfirm>
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
        <img src={img} style={{ height: '60px', width: '120px' }} />
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
ActivityListTable.propTypes = propTypes;

export default ActivityListTable;
