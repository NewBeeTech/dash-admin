/**
 * @flow weak
 */
import React, { PropTypes } from 'react';
import styles from '../../assets/stylesheets/Report/report.css';
import { Checkbox } from 'antd';
import shallowCompare from 'react-addons-shallow-compare';

const CheckboxGroup = Checkbox.Group;

class CheckModules extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    return (
      <div className={styles.modules}>
        <div className={styles.modulesTitle}>模块选择</div>
        <div className={styles.templateStyle}>
          <CheckboxGroup
            options={this.props.options}
            value={this.props.defaultValue}
            onChange={(e) => {
              this.props.onChangeAction(e);
            }}
            disabled={!this.props.editing}
          />
        </div>
      </div>
    );
  }
}

CheckModules.propTypes = {
  defaultValue: PropTypes.array,
  editing: PropTypes.bool,
  options: PropTypes.array,
  onChangeAction: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default CheckModules;
