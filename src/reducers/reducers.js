import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// 引入各reducers
import UserReducer from './UserReducer';
import AccountListReducer from './AccountListReducer';
import AccountReducer from './AccountReducer';
import EMRListReducer from './EMRListReducer';
import StudioListReducer from './StudioListReducer';
import StudioReducer from './StudioReducer';
import ToAssociatedPatientListReducer from './ToAssociatedPatientListReducer';
import ChatListReducer from './ChatListReducer';
import StatisticsReducer from './StatisticsReducer';
import AllStatisticsReducer from './AllStatisticsReducer';
import StudioStatisticsReducer from './StudioStatisticsReducer';
import VisualStatisticsReducer from './VisualStatisticsReducer';
import BasicReducer from './BasicReducer';
import ToAssociatedRecordListReducer from './ToAssociatedRecordListReducer';
import TemplateListReducer from './TemplateListReducer';
import TemplateReducer from './TemplateReducer';
import EMRsReducer from './EMRsReducer';
import SendGroupReducer from './SendGroupReducer';
import PatientListReducer from './PatientListReducer';
import PatientInfoReducer from './PatientInfoReducer';
import FollowUpListReducer from './FollowUpListReducer';
import FollowUpReducer from './FollowUpReducer';
import PatientEducationListReducer from './PatientEducationListReducer';
import PatientEducationReducer from './PatientEducationReducer';
import PatientRemarksReducer from './PatientRemarksReducer';
import PatientBasicInfoReducer from './PatientBasicInfoReducer';
import IMReducer from './IMReducer';
import QuickReplyReducer from './QuickReplyReducer';
import SystemReducer from './SystemReducer';
import PatientRecordListReducer from './PatientRecordListReducer';
import PolicyListReducer from './PolicyListReducer';
import InsuranceListReducer from './InsuranceListReducer';
import InsuranceInfoReducer from './InsuranceInfoReducer';
import GreenChannelReducer from './GreenChannelReducer';
import TodoListReducer from './TodoListReducer';
import HealthReportReducer from './HealthReportReducer';
import HealthReportListReducer from './HealthReportListReducer';
import SingleHealthReportReducer from './SingleHealthReportReducer';
import PhyActivityReportReducer from './PhyActivityReportReducer';
import SleepReportReducer from './SleepReportReducer';
import CookingReportReducer from './CookingReportReducer';
import EmotionReportReducer from './EmotionReportReducer';
import ComplaintListReducer from './ComplaintListReducer';
import DoctorSayReducer from './DoctorSayReducer';
import RefundUserListReducer from './RefundUserListReducer';
import ReportPreviewReducer from './ReportPreviewReducer';
import HospitalListReducer from './HospitalListReducer';
import HospitalInfoReducer from './HospitalInfoReducer';
import DeptInfoReducer from './DeptInfoReducer';
import DeptListReducer from './DeptListReducer';


// 状态入口
const appReducers = combineReducers({
  routing: routeReducer,
  SystemReducer,
  UserReducer,
  StudioListReducer,
  EMRListReducer,
  AccountListReducer,
  AccountReducer,
  StudioReducer,
  ToAssociatedPatientListReducer,
  ChatListReducer,
  StatisticsReducer,
  BasicReducer,
  ToAssociatedRecordListReducer,
  TemplateListReducer,
  TemplateReducer,
  AllStatisticsReducer,
  StudioStatisticsReducer,
  VisualStatisticsReducer,
  EMRsReducer,
  SendGroupReducer,
  PatientListReducer,
  PatientInfoReducer,
  FollowUpListReducer,
  FollowUpReducer,
  PatientEducationListReducer,
  PatientEducationReducer,
  PatientRemarksReducer,
  PatientBasicInfoReducer,
  IMReducer,
  QuickReplyReducer,
  PolicyListReducer,
  PatientRecordListReducer,
  InsuranceListReducer,
  InsuranceInfoReducer,
  GreenChannelReducer,
  TodoListReducer,
  HealthReportReducer,
  HealthReportListReducer,
  SingleHealthReportReducer,
  PhyActivityReportReducer,
  SleepReportReducer,
  CookingReportReducer,
  EmotionReportReducer,
  ComplaintListReducer,
  DoctorSayReducer,
  RefundUserListReducer,
  ReportPreviewReducer,
  HospitalListReducer,
  HospitalInfoReducer,
  DeptListReducer,
  DeptInfoReducer,
});

export default appReducers;
