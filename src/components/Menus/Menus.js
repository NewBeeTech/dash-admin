import React, { PropTypes } from 'react';
import shalloCompare from 'react-addons-shallow-compare';
import { View } from 'isomorphic';
import { Menu, Icon } from 'antd';
import MenusHeader from './MenusHeader';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import styles from '../../assets/stylesheets/Menus/Menus.css';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class Menus extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  state = {
    current: 'Banner轮播广告位',
  };
  _handleClick(e) {
    this.setState({
      current: e.key,
    });
    if (e.key === 'Banner轮播广告位') {
      this.props.dispatch(push(RoutingURL.BannerList()));
    } else if (e.key === '活动管理') {
      this.props.dispatch(push(RoutingURL.DashList()));
    } else if (e.key === '用户管理') {
      this.props.dispatch(push(RoutingURL.UserList()));
    } else if (e.key === '报名活动管理') {
      this.props.dispatch(push(RoutingURL.ActivityList()));
    }
  }
  render() {
    return (
      <View>
        <MenusHeader />
          <View style={{ height: '85vh', overflow: 'scroll' }}>
            <Menu
              theme="dark"
              onClick={(e) => this._handleClick(e)}
              mode="inline"
            >
                <SubMenu
                  key="Banner轮播广告位"
                  title={<div className={styles.subTitle}>
                  Banner轮播广告位</div>}
                >
                      <Item
                        key="Banner轮播广告位"
                      >
                        • Banner轮播广告位
                      </Item>
                </SubMenu>
                <SubMenu
                  key="活动管理"
                  title={<div className={styles.subTitle}>
                  活动管理</div>}
                >
                      <Item
                        key="活动管理"
                      >
                        • 活动管理
                      </Item>
                </SubMenu>
                <SubMenu
                  key="用户管理"
                  title={<div className={styles.subTitle}>
                  用户管理</div>}
                >
                      <Item
                        key="用户管理"
                      >
                        • 用户管理
                      </Item>
                </SubMenu>
                <SubMenu
                  key="报名活动管理"
                  title={<div className={styles.subTitle}>
                  报名活动管理</div>}
                >
                      <Item
                        key="报名活动管理"
                      >
                        • 报名活动管理
                      </Item>
                </SubMenu>
            </Menu>
        </View>
      </View>
    );
  }
}

export default Menus;
