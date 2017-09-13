/**
 * @flow
 * Created by leiyouwho on 16/4/2016.
 */

import React, { PropTypes } from 'react';
import IteratorComopnent from './IteratorComponent';
import styles from '../../assets/stylesheets/Report/report.css';
import type { } from '../../actions/types';
import ReportHeader from './ReportHeader';
import ReportPagNav from './ReportPagNav';

type Props = {
  currentIndex: number, // 当前组件index
  nextPageAction: Function, // 下一个组件回调
  previousPageActon: Function, // 上一个组件回调
  preview: { // 封面
    Components: Array<React.Element<>>, // 封面组件
    componentsProps: Object[], // 组件props
  },
  edit: { // 编辑
    editing: boolean, // 是否允许编辑
    Components: Array<React.Element<>>, // 编辑组件
    componentsProps: Object[], // 组件props
  },
  selectedModules: { // 选择模块
    Component: React.Element<>, // 选择模块组件
    editing: boolean, // 是否允许编辑
    moduleProps: Object[],
  },
}
class ReportComponent extends React.PureComponent {
  static propTypes = {
    currentIndex: PropTypes.number.isRequired, // 当前组件index
    nextPageAction: PropTypes.func, // 下一个组件回调
    previousPageActon: PropTypes.func, // 上一个组件回调
    preview: PropTypes.object,
    edit: PropTypes.object,
    selectedModules: PropTypes.object,
    previousPageActon: PropTypes.func,
    nextPageAction: PropTypes.func,
    getBibliographyAction: PropTypes.func,
    reportType: PropTypes.number,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object,
    routeBack: PropTypes.func.isRequired,
    routeModify: PropTypes.func.isRequired,
    createReportAction: PropTypes.func.isRequired,
    sendReportAction: PropTypes.func.isRequired,
    paramsObj: PropTypes.object.isRequired,
    status: PropTypes.number,
    allowMoudleIds: PropTypes.array,
    allModules: PropTypes.array,
  }
  props: Props;

  renderCurrent(currentIndex) {
    let current;
    const moudleIds = this.props.selectedModules.moduleProps.defaultValue;
    console.log(moudleIds);
    for (let i = 0; i < moudleIds.length; i++) {
      console.log(currentIndex, moudleIds[i]);
      if (moudleIds[i] === currentIndex) {
        current = i;
        return current;
      }
      return current;
    }
    return current;
  }
  render() {
    const id = Number(this.props.params.id);
    const editing = Boolean(this.props.location.query.editing);
    return (
      <div className={styles.contentBody}>
        {/* 预览 */}
        <ReportHeader
          status={this.props.status}
          id={id}
          editing={editing}
          routeBack={this.props.routeBack}
          routeModify={this.props.routeModify}
          createReportAction={this.props.createReportAction}
          sendReportAction={this.props.sendReportAction}
          params={this.props.paramsObj}
          form={this.props.form}
          getBibliographyAction={this.props.getBibliographyAction}
          reportType={this.props.reportType}
        />
        <div className={styles.contentContainer}>
          <div className={styles.contentBox}>
            <div className={styles.preview}>
              <div className={styles.webTitle}>
                {/* {this.props.selectedModules.moduleProps.options[this.props.currentIndex].label} */}
              </div>
              <div className={styles.webStyle}>
                <IteratorComopnent
                  { ...this.props.preview }
                  currentIndex={this.props.currentIndex}
                />
              </div>
              <ReportPagNav
                previousPageActon={this.props.previousPageActon}
                nextPageAction={this.props.nextPageAction}
                total={this.props.selectedModules.moduleProps.defaultValue.length}
                current={this.props.currentIndex}
                allowMoudleIds={this.props.allowMoudleIds}
                allModules={this.props.allModules}
              />
            </div>
            {/* 编辑 */}
            <div className={styles.rightDiv}>
              <div className={styles.edit}>
                <IteratorComopnent
                  { ...this.props.edit }
                  currentIndex={this.props.currentIndex}
                />
              </div>
              {/* 模块 */}
              <div className={styles.selectedModules}>
                <IteratorComopnent
                  { ...this.props.selectedModules }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportComponent;
