
import React, { PropTypes } from 'react';
import { Table, Popconfirm, Input } from 'antd';
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
      width: 70,
    }, {
      title: '订单ID',
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
      width: '15%',
      dataIndex: 'activityTime',
      key: 'activityTime',
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '性别',
      dataIndex: 'var1',
      key: 'var1',
    }, {
      title: '备注',
      dataIndex: 'var2',
      key: 'var2',
      width: '20%',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }];
    this.state = {
      editIndex: '',
    }
  }
  getStatus(status) {
    let text = '';
    if(status == 0) {
      text = '未支付';
    }
    if(status == 1) {
      text = '支付成功';
    }
    if(status == 2) {
      text = '流局';
    }
    if(status == 3) {
      text = '用户取消';
    }
    return text;
  }
  renderTuiKuan(data) {
    const status = data.get('status');
    const mark = data.get('var2');
    if (mark && mark.indexOf('已退款') > -1) {
    } else {
      if (status == 2 || status == 3) {
        return (
          <Popconfirm
            title="确认要标记为退款?"
            okText="确认已退款"
            cancelText="取消"
            onConfirm={() => this.props.changeActivityTuiKuanStatus({
              pingxxId: data.get('pingxxId'),
              activityId: data.get('activityId'),
              userId: data.get('userId'),
              status: 6,
              var2: '已退款'
            })}
          >
            <a
              style={{ color: '#FF7316' }}
              href="#"
            >
              需退款
            </a>
          </Popconfirm>
        )
      }
    }
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  renderColorRemarks(remarks) {
    // let text = remarks;
    const text = [];
    const index = remarks.indexOf('已退款');
    if(index > -1) {
      const list = remarks.split('已退款');
      list.map((item, key) => {
        if(item) {
          text.push(<span key={key}>{item}<span style={{color: '#f40'}}>已退款</span></span>);
        }
      });
      return text;
    }
    return remarks;
  }
  renderRemarks(remarks, index, pingxxId) {
    if(this.state.editIndex === index) {
      return (
        <div>
          <div>
          <Input
             value={this.state.value}
             onChange={e => this.handleChange(e)}
           />
          </div>
          <div style={{ textAlign: 'right' }}>
            <a onClick={() => {
              this.props.changeRemarkAction({ pingxxId, var2: this.state.value });
              this.setState({ editIndex: '', value: '' });
            }}>保存</a>&nbsp;&nbsp;&nbsp;
            <a onClick={() => this.setState({ editIndex: '', value: '' })}>取消</a>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>{this.renderColorRemarks(remarks)}</div>
        <div style={{ textAlign: 'right' }}>
          <a onClick={() => this.setState({ editIndex:index, value: remarks})}>编辑备注</a>
        </div>
      </div>
    );
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
        // orderId: data.get('orderId'),
        updateTime: data.get('updateTime'),
        userId: data.get('userId'),
        var1: sex ? (sex == 1 ? '男' : '女') : '未知',
        var2: this.renderRemarks(data.get('var2'), index, data.get('pingxxId')),
        status: this.getStatus(data.get('status')),
        operation: (
          <View>
            {/*
              { data.get('status') == 1 &&
              <Popconfirm
                title="确认要标记问题?"
                okText="确认标记"
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
              }
              { data.get('status') == 2 &&
              <Popconfirm
                title="确认要恢复?"
                okText="确认恢复"
                cancelText="取消"
                onConfirm={() => this.props.changeStatusAction({id: data.get('id'), status: 1 })}
              >
                <a
                  style={{ color: '#40a5ed' }}
                  href="#"
                >
                  恢复正常
                </a>
              </Popconfirm>
              }
            */}
            {this.renderTuiKuan(data)}
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
