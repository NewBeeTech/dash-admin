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
    current: '后台系统首页1',
  };
  _handleClick(e) {
    this.setState({
      current: e.key,
    });
    if (e.key === '后台系统首页1') {
      this.props.dispatch(push(RoutingURL.Shouye()));
    } else if (e.key === '后台系统首页2') {
      this.props.dispatch(push(RoutingURL.Shouye()));
    } else if (e.key === '后台系统首页3') {
      this.props.dispatch(push(RoutingURL.Shouye()));
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
                  key="后台系统首页"
                  title={<div className={styles.subTitle}>
                  档案查询</div>}
                >
                      <Item
                        key="后台系统首页1"
                      >
                        • 后台系统首页1
                      </Item>
                      <Item
                        key="后台系统首页2"
                      >
                        • 后台系统首页2
                      </Item>
                      <Item
                        key="后台系统首页3"
                      >
                        • 后台系统首页3
                      </Item>
                </SubMenu>
            </Menu>
        </View>
      </View>
    );
  }
}

export default Menus;
