/* @flow */
let host: string;
if (process.env.NODE_ENV === 'development') {
  host = 'dev.drmondo.hsohealth.com/drmondoapi';
}
if (process.env.NODE_ENV === 'test') {
  host = 'dev.drmondo.hsohealth.com/drmondoapi';
}
if (process.env.NODE_ENV === 'production') {
  host = 'shaka.hsohealth.com';
}
const rootURL: string = `https://${host}/api/v1/`;
const commonURL: string = `https://${host}/`;
// export const rootURL = `http://${host}/api/v1/`;

/**
 * 登录地址
 * @type {string}
 */
export const LoginPath: string = `${rootURL}doctor_studio_login`;

/** ************************* 档案查询模块  ***********************************************************/
/**
 * 获取患者信息列表地址
 * @type {string}
 */
export const EMRListPath: string = `${rootURL}patient_mgmt/patients`;

/**
 * 获取未建档患者信息列表地址
 * @type {string}
 */
export const ToAssociatedPatientListPath: string =
 `${rootURL}patient_mgmt/doctor_studios/new_patients/all`;
/**
 * 获取未关联档案列表地址
 * @type {string}
 */
export const ToAssociatedRecordListPath = (id: string): string => {
  return `${rootURL}doctor_studio/${id}/new_emrs`;
};
/**
 * 关联档案地址
 * @type {string}
 */
export const relationEMRPath = (patientId: string, emrId: string): string => {
  return `${rootURL}patients/${patientId}/emrs/${emrId}/binding`;
};
/**
 * 获取看诊小结内容地址
 * @type {int}
 */
export const getSummaryPath = (emrId: string): string => {
  return `${rootURL}emr/${emrId}/summary`;
};
/**
 * 发送看诊小结内容地址
 * @type {string}
 */
export const sendSummaryPath = (ermId: string): string => {
  return `${rootURL}emr/${ermId}/summary`;
};

/**
 * 获取EMR模板信息
 * @param id 模板ID
 * @returns {string}
 */
export const getFormTemplatePath = (id: string): string => {
  return `${rootURL}patient_mgmt/users/${id}`;
};

/**
 * 提交EMR表单
 * @param id 患者ID
 * @returns {string}
 */
export const postFormPath = (id: string): string => {
  return `${rootURL}patient_mgmt/patients/${id}/emrs`;
};

/**
 * 显示患者病例详情
 * @param id 患者ID
 * @returns {string}
 */
export const getEMRsPath = (id: string): string => {
  return `${rootURL}patient_mgmt/patients/${id}/emrs`;
};

/**
 * 提交新建病例
 * @param id 患者ID
 * @returns {string}
 */
export const postEMRPath = (id: string): string => {
  return `${rootURL}doctor_studios/${id}/patient_mgmt/emr_filing`;
};

/**
 * 获取主诉档案列表
 */
export const getComplaintListPath = `${rootURL}patient_mgmt/patient_record_list`;

/**
 * 获取主诉档案详情
 */
export const getComplaintPath = `${rootURL}patient_mgmt/patient/patient_record`;

/**
 * 修改主诉档案
 */
export const updateComplaintPath = `${rootURL}patient_mgmt/patient_patient_record`;

/** ***************************  工作室模块  *************************************************/
/**
 * 工作室及聊天管理
 * @type {string}
 */
export const StudioListPath: string = `${rootURL}patient_mgmt/doctor_studios`;
export const StudioPath = (id: string) => {
  return `${rootURL}patient_mgmt/doctor_studios/${id}`;
};
export const StudioCreatePath: string = `${rootURL}patient_mgmt/doctor_studios`;
 // 工作室关联模版
export const relateTemplatePath = (studioId: string, templateId: string): string => {
  return `${rootURL}doctor_studio/${studioId}/emr_templates/${templateId}`;
};
 // 取消工作室关联模版
export const deleteRelateTemplatePath = (studioId: string, templateId: string): string => {
  return `${rootURL}doctor_studio/${studioId}/emr_templates/${templateId}/unbind`;
};
 // 工作室关联患者管理
export const relatePatientManagementPath = `${rootURL}doctor_studio/plan_bind`;
 // 取消工作室关联患者管理
export const deleteRelatePatientManagement = `${rootURL}doctor_studio/plan_unbind`;
 // 上传图片
export const GetOSSSignature: string = `${rootURL}get_oss_signature/hso_record`;

/*
  绩效查看
 */
// 聊天查看
export const getChatListPath: string = `${rootURL}patient_mgmt/studio_chatList`;
export const getChatHistoryPath: string = `${rootURL}patient_mgmt/get_chats`;
// 绩效可视化接口
export const VisualStatisticsPath = `${rootURL}patient_mgmt/performance_statistics/visible`;
// 绩效统计查看接口
export const StatisticsPath: string = `${rootURL}patient_mgmt/Performance_statistics`;
export const AllStatisticsPath: string = `${rootURL}patient_mgmt/Performance_statistics_detail`;
export const StudioStatisticsPath: string = `${rootURL}patient_mgmt/Performance_StudioStatistics`;
// 绩效统计导出接口
export const AllStatisticsPathExport =
`${rootURL}patient_mgmt/Performance_statistics_detail/export`;
export const StatisticsPathExport = `${rootURL}patient_mgmt/Performance_Statistics/export`;
export const StudioStatisticsPathExport =
 `${rootURL}patient_mgmt/Performance_studioStatistics/export`;


/** ***************************  账户模块  *************************************************/
/**
 * 获取账户列表地址
 * @type {string}
 */
export const AccountListPath: string = `${rootURL}patient_mgmt/users`;
/**
 * 修改, 创建 账户地址
 * @type {string}
 */
export const AccountPath: string = `${rootURL}patient_mgmt/users`;
/**
 * 获取账户详情地址
 * @type {string}
 */
export const AccountInfoPath: string = `${rootURL}patient_mgmt/user_info`;
export const exitAccountPath: string = `${rootURL}user_mgmt/user_name`;
export const deleteAccountPath = (id: string): string => {
  return `${rootURL}patient_mgmt/users/${id}`;
};

/** ***************************  获取下拉搜索路由  *************************************************/

// 获取下拉列表
export const getCitysPath: string = 'cities';
export const getBranchPath: string = '';
export const getRolePath: string = '';
export const getStudiosPath: string = `${rootURL}doctor_studio/studio_name`;
export const getHospitalsPath: string = `${rootURL}hospital_mgmt/hospital_name`;
export const getDepartmentsPath: string = `${rootURL}department_mgmt/department_name`;
export const getUsersPath: string = `${rootURL}user_mgmt/user_name`;
export const getDeptsPath: string = `${rootURL}department_mgmt/dept_label`;
export const getUserIDsPath: string = `${rootURL}user_mgmt/user_id`;

export const getTemplatesPath = (departmentId: number, type: number) => {
  return `${rootURL}emr_template_mgmt/departments/${departmentId}/emr_types/${type}/emr_templates`;
};
export const getPatientMgmtsPath = `${rootURL}patient_mgmt/plan`;
export const getPatientEdusPath = `${rootURL}patient_mgmt/education`;

// 获取模版列表
export const getTemplateListPath: string = `${rootURL}emr_template_mgmt/emr_templates`;
// 新建模版
export const createTemplatePath: string = `${rootURL}emr_template_mgmt/emr_template`;
// 套餐类型列表
export const getServiceProductPath: string = `${rootURL}patient/service_product_list`;
/** ***************************  消息推送路由  *************************************************/
// 消息推送
export const getPatientGroupListPath: string = `${rootURL}emr_mgmt/emr_filter_list`;
export const sendGroupMessagePath: string = `${rootURL}emr_mgmt/mass_wechat_message_push`;
export const getDiseaseListPath = (templateId: string): string => {
  return `${rootURL}emr_templates/${templateId}/diseases`;
};

/** ***************************  患者管理路由  *************************************************/

// 获取患者列表
export const getPatientListPath: string = `${rootURL}patient_mgmt/patient_list`;
// 获取患者详情
export const getPatientInfoPath: string = `${rootURL}patient_mgmt/patient_detail`;
// 添加患者管理方案
export const addPatientPlanPath: string = `${rootURL}patient_mgmt/patient_plan_add_relation`;
// 删除患者管理方案
export const deletePatientPlanPath: string = `${rootURL}patient_mgmt/patient_plan_del_relation`;
// 修改患者管理方案
export const updatePatientPlanPath: string = `${rootURL}patient_mgmt/patient_plan_update_relation`;
// 患者管理方案时间类型
export const getPlanTimeStatusPath =
(planId: number) => `${rootURL}patient_mgmt/patient_plan_time_event/${planId}`;
// 患者管理（原随访）
export const getFollowUpListPath = `${rootURL}patient_mgmt/plan_list`;
export const getFollowUpInfoPath = `${rootURL}patient_mgmt/plan_get`;
export const createFollowUpPath = `${rootURL}patient_mgmt/plan_create`;
export const updateFollowUpPath = `${rootURL}patient_mgmt/plan_update`;
export const getTimeSchemeListPath = `${rootURL}patient_mgmt/time_scheme_list`;
export const exitFollowUpPath = (planName: string) => {
  return `${rootURL}patient_mgmt/plan_name_unique/${planName}`;
};
// 患教
export const getPatientEducationListPath = `${rootURL}patient_mgmt/education_list`;
export const getPatientEducationInfoPath = `${rootURL}patient_mgmt/education_info`;
export const createPatientEducationPath = `${rootURL}patient_mgmt/education_add`;
/*
查看患者血压接口
 */
export const getBloodpressurePath = `${rootURL}patient_mgmt/blood_pressure_list`;
 /*
 查看患者血脂接口
  */
export const getBloodlipidsPath = `${rootURL}patient_mgmt/blood_lipids_list`;
  /*
  查看患者服药接口
   */
export const getMedicineRecordPath = `${rootURL}patient_mgmt/medication_list`;
   /*
   修改患者服药接口
    */
export const updateBloodlipidsPath = `${rootURL}patient_mgmt/update_bloodlipids_data`;
/*
查看患者活动列表接口
 */
export const getActivityListPath = 'patient_mgmt/user/vip_status';

// 查看患者随访列表接口
export const getPlansListPath = `${rootURL}patient_mgmt/binding_plan_list`;
// 查看患者录音列表
export const getPatientRecordListPath = `${rootURL}patient_mgmt/voice_records`;

// 电子处方单新建或修改
export const addIndicatorPath = `${rootURL}patient_mgmt/electronic_prescription/update_indicator`;
// 电子购买须知新建或修改
export const addUserInfoOperatorPath =
 `${rootURL}patient_mgmt/backend/electronic_prescription/update_user_info`;
// 线下支付
export const addPaymentPath = (userId: number) => {
  return `${rootURL}user/${userId}/order`;
};
// 保存处方单照片
export const saveImgPath = `${rootURL}patient_mgmt/electronic_prescription/update_img`;

/** ***************************  在线聊天路由  *************************************************/
/**
 * [患者群组备注路由]
 */
export const getPatientRemarksPath = `${rootURL}doctor_studios/get_group_remark`;
export const updatePatientRemarksPath = `${rootURL}doctor_studios/add_group_remark`;
/**
 * [患者详情]
 */
export const getPatientBasicInfoPath = (id: number) => {
  return `${rootURL}patient_mgmt/patient_info/${id}`;
};
/**
 * [患者标签路由]
 */
export const addPatientsTagPath = `${rootURL}tags/patient_add`;
export const deletePatientsTagPath = `${rootURL}tags/patient_del`;
export const getPatientsTagListPath = `${rootURL}tags/patient_list`;
/**
 * 我的标签路由
 */
export const getMyTagListsPath = `${rootURL}tags/doctor_assistant_add`;

/**
 * 获取工作室列表请求地址
 * @param  {[type]} id 医助id
 * @return {[type]}    [description]
 */
export const getStuoidListPath = (id: number | string) =>
 `${rootURL}assistant/${id}/doctor_studios`;

export const getConversationGroupsPath = (id: number, studioId: number) =>
`${rootURL}assistant/${id}/doctor_studio/${studioId}/conversation_groups`;

/**
 * （实时搜索）获得聊天群组的名字或者内容
 * @param  {[type]} userId 登录者Id
 * @return {[type]}        [description]
 */
export const getSearchConversationPath = (userId: number | string) =>
`${rootURL}realtime/staff/${userId}/conversation_content`;

/*
快捷回复路由
 */
export const getQuickReplysPath = `${rootURL}doctor_studios/user_quick_answer`;
export const addQuickReplysPath = `${rootURL}doctor_studios/add_quick_answer`;
export const deleteQuickReplysPath = `${rootURL}doctor_studios/delete_quick_answer`;

export const chatHistory = `${rootURL}doctor_studios/chat_history`;

// 根据 groupId 获取该群组信息  http://rap.chuanty.com/workspace/myWorkspace.do?projectId=19#447
export const getChatWithoutHistoryPath = (groupId: string): string =>
`${rootURL}rongcloud_group/${groupId}/info`;
// 根据groupId 获取WORKBOOK
export const getWorkBookPath = (groupId: number) =>
 `${rootURL}conversation_group/${groupId}/workbook`;

 // 添加患者动态
export const addPatientRecordPath = `${rootURL}patient/patient_time_line`;
// 添加TODOlist
export const addTodoListPath = `${rootURL}doctor_assistant/dispatch_todo`;
// 获取患者动态
export const getPatientRecordPath = `${rootURL}patient/patient_time_line`;
// 获取聊天组members
export const getMembersPath = (groupId: number) =>
 `${rootURL}conversation/${groupId}/members_with_role`;

export const isInGroupPath = `${rootURL}conversation_group/is_in_group`;

/** ***************************  保户管理路由  *************************************************/

/**
 * 获取询价单列表请求地址
 * @type {string}
 */
export const getPolicyListPath: string = `${rootURL}patient_mgmt/insurance_list`;

/**
 * 获取询价单列表请求地址
 * @type {string}
 */
export const updatePolicyStatusPath: string = `${rootURL}patient_mgmt/update_insurance_status`;

/**
 * 获取保单列表请求地址
 * @type {string}
 */
export const getInsuranceListPath: string = `${rootURL}patient_mgmt/insurance/policy_list`;

/**
 * 获取保单信息请求地址
 * @type {string}
 */
export const getInsuranceInfoPath = (id: number): string =>
`${rootURL}patient_mgmt/insurance/policy/${id}`;

/**
 * 新建或更新保单信息请求地址
 * @type {string}
 */
export const createUpdateInsurancePath: string = `${rootURL}patient_mgmt/insurance/create_update`;

/**
 * 获取保险类型下拉列表
 * @type {string}
 */
export const getInsuranceTypePath: string = `${rootURL}patient_mgmt/insurance/products`;

/**
 * 通过患者id获取微信名称和患者姓名
 * @type {string}
 */
export const getPatientNamePath = (id: number): string =>
`${rootURL}patient_mgmt/user_name/${id}`;

// 获取复诊列表接口
export const getGreenChannelListPath: string = `${rootURL}patient_mgmt/users/appointments`;

// 修改复诊信息接口
export const updateGreenChannelPath: string = `${rootURL}patient_mgmt/appointment`;

/* ************************* 健康报告 ******************************* */

// 获取健康档案列表
export const getHealthReportListPath: string = `${rootURL}patient_mgmt/report_list`;

// 新建健康档案详情
export const createDietHealthReportPath: string = `${rootURL}patient_mgmt/create_report_food`;

// 获取健康档案详情
export const getDietHealthReportPath: string = `${rootURL}patient_mgmt/report_food_info`;

// 发送健康档案详情
export const sendHealthReportPath: string = `${rootURL}patient_mgmt/report_send`;

// 删除健康档案详情
export const removeHealthReportPath: string = `${rootURL}patient_mgmt/report_delete`;


// 创建膳食报告时获取用户信息
export const getReportUserInfoPath: string = `${rootURL}patient_mgmt/report_food_user_info`;

// 创建膳食报告食物实时搜索
export const getFoodNamesPath: string = `${rootURL}patient_mgmt/foods`;

// 获取替换食物
export const getReplaceFoodsPath: string = `${rootURL}patient_mgmt/report_replace_foods`;

// 获取膳食文献
export const getBibliographyPath: string = `${rootURL}patient_mgmt/bibliographies`;

// 单一食物打分
export const getSingleScorePath: string = `${rootURL}patient_mgmt/one_food_score`;

// 新建单一膳食健康档案详情
export const createSingleHealthReportPath: string = `${rootURL}patient_mgmt/create_report_one_food`;

// 新建身体活动报告
export const createPhyActivityReportPath: string = `${rootURL}patient_mgmt/create_report_sport`;
// 获取用户详情
export const getPhyUserInfoPath: string = `${rootURL}patient_mgmt/report_sport_user_info`;
// 获取身体活动报告详情
export const getPhyActivityReportPath: string = `${rootURL}patient_mgmt/report_sport_info`;
// 搜索活动列表
export const getPhyListPath: string = `${rootURL}patient_mgmt/sports`;


// 获取烹饪活动报告详情
export const getCookingReportPath: string = `${rootURL}patient_mgmt/report_food_cook`;
// 新建报告
export const createCookingReportPath: string = `${rootURL}patient_mgmt/create_report_food_cook`;
// 获取烹饪前后评分变化
export const getCookingScorePath: string = `${rootURL}patient_mgmt/food_cook_score`;
// 获取烹饪方法列表
export const getCookingTypePath: string = `${rootURL}patient_mgmt/food_cook_type`;
// 获取食物烹饪前后营养变化
export const getCookingAfterChangePath: string =
 `${rootURL}patient_mgmt/food_cook_nutrition_score`;
// 新建时获取用户详情
export const getCookingUserInfoPath: string = `${rootURL}patient_mgmt/food_cook_user_info`;

// 获取睡眠报告详情
export const getSleepReportPath: string = `${rootURL}patient_mgmt/report_sleep_info`;
// 新建报告
export const createSleepReportPath: string = `${rootURL}patient_mgmt/create_report_sleep`;
// 新建时获取用户详情
export const getSleepUserInfoPath: string = `${rootURL}patient_mgmt/report_sleep_user_info`;
// 获取睡眠分数
export const getSleepScorePath: string = `${rootURL}patient_mgmt/report_sleep_score`;

// 获取情绪报告详情
export const getEmotionReportPath: string = `${rootURL}patient_mgmt/report_feeling_info`;
// 新建报告
export const createEmotionReportPath: string = `${rootURL}patient_mgmt/create_report_feeling`;
// 新建时获取用户详情
export const getEmotionUserInfoPath: string = `${rootURL}patient_mgmt/report_sleep_user_info`;
// 获取患者图片
export const getPatientImagePath: string = `${rootURL}patient_mgmt/patients/get_patient_img`;
// 聊天界面给患者发送危险排查链接
export const sendInvestigationPath: string = `${rootURL}patient_mgmt/patients/send_news_message`;
// 获取家属信息
export const getFamilyInfoPath: string = `${rootURL}patient_mgmt/patients/get_family_info`;
// 上传用户FB
export const uploadPatientFBPath: string = `${rootURL}patient_mgmt/patients/add_patient_img`;
// 删除用户FB
export const deletePatientFBPath: string = `${rootURL}patient_mgmt/patients/delete_patient_img`;
// 获取退单用户列表
export const getRefundUserListPath: string = `${rootURL}patient_mgmt/patients/payment_user_list`;
// 退单
export const getRefundPath: string = `${rootURL}patient_mgmt/patients/refund`;
// 获取医院列表
export const getHospitalListPath: string = `${rootURL}hospital/get_hospital_list`;
// 医院
export const getHospitalInfoPath: string = `${rootURL}hospital/get_hospital_info`;
// 新建或修改医院
export const changeHospitalInfoPath: string = `${rootURL}hospital/change_hospital`;
// 获取科室列表
export const getDeptListPath: string = `${rootURL}department/get_dept_list`;
// 科室
export const getDeptInfoPath: string = `${rootURL}department/get_dept_info`;
// 新建或修改可是
export const changeDeptInfoPath: string = `${rootURL}department/change_dept`;
// 医院绑定真是二级科室
export const changeDeptLabelPath: string = `${rootURL}hospital/change_dept_label`;
// 医院解绑真是二级科室
export const deleteDeptInfoPath: string = `${rootURL}hospital/delete_dept_label`;
/** ***************************  公有路由  *************************************************/

// 获取oss图片地址
export const getOssImgPath = `${commonURL}oss_private_url`;

// 获取语音地址
export const getOssVoicePath = `${rootURL}doctor_studios/chat_history_voice`;

// todoList
export const getTodoListPath = `${rootURL}doctor_assistant/todo_list_v2`;
export const changeTodoListPath = `${rootURL}doctor_assistant/todo`;
