/**
 * Created by wl on 16/7/11.
 * @flow
 */

export const PrefixURL = (): string => '/';
export const Login = (): string => '/Login';
export const App = (): string => '/App';

export const prefix = (prefixs: string): string => `${PrefixURL()}${prefixs}`;

/* **************************  工作室管理模块  ******************************************** */
export const StudioList = (): string => prefix('Studio/StudioList');
/**
 * Studio（create & update & details） module RoutingRUL
 */
export const Studio = (id : string = '', editing : boolean = false): string => {
  if (editing) {
    return prefix(`Studio/Studio/${id}?editing=true`);
  }
  return prefix(`Studio/Studio/${id}`);
};
/**
 * Studio group chatList module RoutingRUL
 * 工作室及聊天群组路由
 */
export const groupList = (id: number): string => prefix(`Studio/ChatList/${id}`);
/**
 * Studio statistics module RoutingRUL
 * 工作室绩效统计模块路由
 */
export const StudioStatistics = (): string => prefix('Studio/StudioStatistics');
/**
 * All statistics module RoutingRUL
 * 详细绩效统计模块路由
 */
export const AllStatistics = (): string => prefix('Studio/AllStatistics');
/**
 * Staff statistics module RoutingRUL
 * 员工绩效统计模块路由
 */
export const Statistics = (): string => prefix('Studio/Statistics');
export const VisualStatistics = (): string => prefix('Studio/VisualStatistics');

/**
 * Template module RoutingRUL
 */
export const TemplateList = (): string => prefix('Studio/TemplateList');
export const Template = (): string => prefix('Studio/Template');

/* **************************  档案管理模块  ******************************************** */
/**
 * Patient management module RoutingRUL
 * EHR list module RoutingRUL
 */
export const EMRList = (): string => prefix('DM/EMRList');
/**
 * createEHR module RoutingRUL
 */
export const createdEMR = (studioId: number, id: number, studioName: string): string => {
  if (studioName) {
    return prefix(`DM/EMR/studioID/${studioId}/EMRId/${id}?studioName=${studioName}`);
  }
  return prefix(`DM/EMR/studioID/${studioId}/EMRId/${id}`);
};
/**
 * showEHR module RoutingRUL
 */
export const showEMR = (patientId: number, EMRId: number): string => {
  if (EMRId) {
    return prefix(`DM/EMRs/${patientId}?EMRId=${EMRId}`);
  }
  return prefix(`DM/EMRs/${patientId}`);
};
/**
 * ToAssociatedPatientList module RoutingRUL
 * 未关联患者列表
 */
export const ToAssociatedPatientList = (): string => prefix('DM/ToAssociatedPatientList');
/**
 * ToAssociatedRecordList module RoutingRUL
 * 未关联患者列表 > 待关联档案列表
 */
export const ToAssociatedRecordList =
 (studioID: number, patientId: number, userName: string, subscribeId: number): string =>
  prefix(`DM/Record/studioID/${studioID}/patientId/${patientId}`
    + `/userName/${userName}/subscribeId/${subscribeId}`);

// 主诉档案列表
export const complaintList = (): string => prefix('DM/ComplaintList');
export const complaint = (userId : string = '', id: string = '', editing : boolean = false): string => {
  if (editing) {
    return prefix(`DM/Complaint/userId/${userId}/id/${id}?editing=true`);
  }
  return prefix(`DM/Complaint/userId/${userId}/id/${id}`);
};

/* **************************  账户管理模块  ******************************************** */
/**
 * AccountList module RoutingRUL
 */
export const AccountList = (): string => prefix('Permission/AccountList');
/**
 * Account（create & update & details） module RoutingRUL
 */
export const Account = (id : string = '', editing : boolean = false): string => {
  if (editing) {
    return prefix(`Permission/Account/${id}?editing=true`);
  }
  return prefix(`Permission/Account/${id}`);
};

/* **************************  患者管理模块  ******************************************** */

/**
 * SendGroup module RoutingRUL
 */
export const sendGroup = (): string => prefix('Message/SendGroup');
/**
 * 患者列表
 * @type {[type]}
 */
export const patientList = (): string => prefix('PatientList');
/**
 * 患者详情
 * @type {[type]}
 */
export const patientInfo = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`PatientInfo/${id}?editing=true`) : prefix(`PatientInfo/${id}`);
};
// 患者录音列表
export const PatientRecordList = (): string => prefix('PatientRecodeList');

/**
 * FollowUpList module RoutingRUL
 */
export const followUpList = () => prefix('Message/FollowUpList');

/**
 * FollowUp（create & update & details）module RoutingRUL
 */
export const followUp = (id: string = '', editing: string = '') => {
  if (editing) {
    return prefix(`Message/FollowUp/${id}?editing=true`);
  }
  return prefix(`Message/FollowUp/${id}`);
};

/**
 * PatientEducationList module RoutingRUL
 */
export const patientEducationList = () => prefix('Message/patientEducationList');
/**
 * patientEducation（create & update & details）module RoutingRUL
 */
export const patientEducation = (id : string = '', editing : string = ''): string => {
  if (editing) {
    return prefix(`Message/patientEducation/${id}?editing=true`);
  }
  return prefix(`Message/patientEducation/${id}`);
};

/**
 * [在线聊天路由]
 * @return {[type]} [description]
 */
export const IM = () => {
  return prefix('IM');
};

/**
 * Policy module RoutingRUL
 * @type {string}
 */
export const PolicyList = () => prefix('Insurance/PolicyList');

/**
 * InsuranceList module RoutingRUL
 * @type {string}
 */
export const InsuranceList = () => prefix('Insurance/InsuranceList');

/**
 * 保单详情
 * @type {string}
 */
export const InsuranceInfo = (id: number | string = '', editing : boolean = false) : string => {
  return editing ? prefix(`Insurance/InsuranceInfo/${id}?editing=true`) :
  prefix(`Insurance/InsuranceInfo/${id}`);
};

/**
 * 复诊管理列表
 */

export const GreenChannelList = () => prefix('GreenChannelList');

/**
 * 健康报告列表
 * @type {string}
 */
export const HealthReportList = (): string => prefix('HealthReportList');

/**
 * 健康报告
 * @type {string}
 */
export const HealthReport = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`HealthReport/${id}?editing=true`) : prefix(`HealthReport/${id}`);
};

// TodoList
export const TodoList = () => prefix('TodoList');

/**
 * 单一膳食健康报告
 * @type {string}
 */
export const SingleHealthReport = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`SingleHealthReport/${id}?editing=true`) :
  prefix(`SingleHealthReport/${id}`);
};

// 身体活动报告
export const PhyActivityReport = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`PhyActivityReport/${id}?editing=true`) :
  prefix(`PhyActivityReport/${id}`);
};

// 睡眠评估报告
export const SleepReport = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`SleepReport/${id}?editing=true`) :
  prefix(`SleepReport/${id}`);
};

// 烹饪评估报告
export const CookingReport = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`CookingReport/${id}?editing=true`) :
  prefix(`CookingReport/${id}`);
};

// 睡眠评估报告
export const EmotionReport = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`EmotionReport/${id}?editing=true`) :
  prefix(`EmotionReport/${id}`);
};

// 医生说
export const DoctorSay = () => prefix('DoctorSay');

// 付费用户-退单用户列表
export const RefundUserList = (): string => prefix('RefundUserList');

// 医院列表
export const HospitalList = (): string => prefix('HospitalList');

// 医院
export const Hospital = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`Hospital/${id}?editing=true`) :
  prefix(`Hospital/${id}`);
};

// 科室列表
export const DeptList = (): string => prefix('DeptList');

// 科室
export const Dept = (id: number | string, editing : boolean = false) : string => {
  return editing ? prefix(`Dept/${id}?editing=true`) :
  prefix(`Dept/${id}`);
};
