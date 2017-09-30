/**
 * Created by wanglu on 7/4/2016.
 */
import React, { PropTypes } from 'react';
import { Table, Popconfirm } from 'antd';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import styles from '../../assets/stylesheets/Common.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import {getActivityTime} from '../../core/CommonFun/moment';

const propTypes = {
  dataSource: PropTypes.instanceOf(Immutable.List),
  dispatch: PropTypes.func,
  goDeleteAction: PropTypes.func,
};

class DashListTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
    }, {
      title: '活动ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '副标题',
      dataIndex: 'smallTitle',
      key: 'smallTitle',
    }, {
      title: '活动图片',
      dataIndex: 'photos',
      key: 'photos',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '活动类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '活动时间',
      dataIndex: 'activityTime',
      key: 'activityTime',
    }, {
      title: '报名时间',
      dataIndex: 'signupTime',
      key: 'signupTime',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas){
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        id: data.get('id'),
        title: data.get('title'),
        smallTitle: data.get('smallTitle'),
        address: data.get('address'),
        photos: this.showImg(data.get('photos')),
        status: data.get('status') ? '上架' : '下架',
        type: data.get('type') === 1 ? '联谊' : '',
        activityTime: getActivityTime(data.get('startTime'), data.get('endTime')),
        createTime: data.get('createTime'),
        signupTime: data.get('signupEndTime') ? `${data.get('signupStartTime')} 至 ${data.get('signupEndTime')}` : '',
        operation: (
          <View>
            <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.DashInfo(data.get('id'))));
              }}
            >
              查看
            </a> | {data.get('status') ? <div /> : <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.DashInfo(data.get('id'), true)));
              }}
            >
              编辑
            </a> }| <Popconfirm
              title="确认要进行删除操作?"
              okText="确认删除"
              cancelText="不删除"
              onConfirm={() => this.props.goDeleteAction({id: data.get('id')})}
            >
              <a
                style={{ color: '#FF7316' }}
                href="#"
              >
                删除
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
DashListTable.propTypes = propTypes;

export default DashListTable;
