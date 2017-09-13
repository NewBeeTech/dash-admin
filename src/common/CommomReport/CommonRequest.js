import * as ReportPreviewAction from './../../actions/ReportPreviewAction';

export function getReportDetails(dispatch, reportType, reportId) {
  switch (reportType) {
    case '全面膳食评估':
      dispatch(
        ReportPreviewAction.getDietReport({ reportId })
      );
      break;
    case '健康情绪评估':
      dispatch(
        ReportPreviewAction.getEmotionReport({ reportId })
      );
      break;
    case '健康睡眠评估':
      dispatch(
        ReportPreviewAction.getSleepReport({ reportId })
      );
      break;
    case '食物烹饪评估':
      dispatch(
        ReportPreviewAction.getCookingReport({ reportId })
      );
      break;
    case '单一食物评估':
      dispatch(
        ReportPreviewAction.getSingleReport({ reportId })
      );
      break;
    case '身体活动评估':
      dispatch(
        ReportPreviewAction.getPhyActivityReport({ reportId })
      );
      break;
    default:
  }
}
