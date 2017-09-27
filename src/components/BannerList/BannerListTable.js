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

const propTypes = {
  dataSource: PropTypes.instanceOf(Immutable.List).isRequired,
  dispatch: PropTypes.func,
  // goAccountAction: PropTypes.func.isRequired,
  // goUpdateAccountAction: PropTypes.func.isRequired,
  // DeleteAccountAction: PropTypes.func.isRequired,
};

class BannerListTable extends React.Component {
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '小标题',
      dataIndex: 'smallTitle',
      key: 'smallTitle',
    }, {
      title: '地址',
      dataIndex: 'url',
      key: 'url',
    }, {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    datas.forEach((data, index) => {
      dataSource.push({
        key: index,
        id: data.get('id'),
        title: data.get('title'),
        smallTitle: data.get('smallTitle'),
        url: data.get('url'),
        img: this.showImg(data.get('img')),
        status: data.get('status') ? '上线' : '下线',
        createTime: data.get('createTime'),
        operation: (
          <View>
            <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.Banner(data.get('id'))));
              }}
            >
              查看
            </a> | <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.Banner(data.get('id'), true)));
              }}
            >
              编辑
            </a> | <Popconfirm
              title="确认要进行删除操作?"
              okText="确认删除"
              cancelText="不删除"
              // onConfirm={() => this.okButton(index, account.get('userId'))}
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
    return dataSource;
  }
  showImg(img) {
    const views = [];
    if(img) {
      views.push(
        <img src={img} style={{ height: '80px', width: '160px' }} />
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
BannerListTable.propTypes = propTypes;

export default BannerListTable;
