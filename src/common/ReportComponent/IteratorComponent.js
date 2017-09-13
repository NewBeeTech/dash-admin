/*
 * @flow
 */

import React from 'react';

class IteratorComponent extends React.PureComponent {
  props: {
    editing?: ?boolean,
    Components?: [],
    Component?: any,
    componentsProps?: ?Object[],
    currentIndex?: ?number,
    moduleProps: Object,
    nextPageAction?: ?Function,
    previousPageActon?: ?Function,
  };
  renderComponent() {
    const {
      editing,
      Components,
      Component,
      componentsProps,
      currentIndex,
      moduleProps,
    } = this.props;
    if (Component && moduleProps) { // 选择模块
      return (
        <Component { ...moduleProps } editing={editing} />
      );
    } else if (Components && componentsProps) { // 预览区 或者 编辑区
      const CurrentComponent = Components[currentIndex];
      return (
        <CurrentComponent { ...this.props.componentsProps[currentIndex] } editing={editing} />
      );
    }
    return <div />;
  }
  render() {
    return <div>{this.renderComponent()}</div>;
  }
}

export default IteratorComponent;
