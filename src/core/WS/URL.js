/* @flow */
const rootURL: string = '/';


// 获取OSS签名
export const GetOSSSignature: string = `${rootURL}oss/sign`;

/**
 * 登录地址
 * @type {string}
 */
export const LoginPath: string = `${rootURL}admin/login`;
/**
 * 获取bannerList
 * @type {string}
 */
export const getBannerListPath: string = `${rootURL}admin/banner/list`;
/**
 * 获取bannerInfo
 * @type {string}
 */
export const getBannerInfoPath: string = `${rootURL}admin/banner/getById`;
/**
 * 添加banner
 * @type {string}
 */
export const addBannerPath: string = `${rootURL}admin/banner/add`;
/**
 * 修改banner
 * @type {string}
 */
export const updateBannerPath: string = `${rootURL}admin/banner/update`;
/**
 * 删除banner
 * @type {string}
 */
export const deleteBannerPath: string = `${rootURL}admin/banner/deleteById`;


/**
 * 活动列表
 * @type {string}
 */
export const getDashListPath: string = `${rootURL}admin/activity/list`;
/**
 * 活动详情
 * @type {string}
 */
export const getDashInfoPath: string = `${rootURL}activity/getInfoById`;
/**
 * 新增活动
 * @type {string}
 */
export const addDashPath: string = `${rootURL}admin/activity/addOrUpdate`;
/**
 * 修改活动
 * @type {string}
 */
export const updateDashPath: string = `${rootURL}admin/activity/addOrUpdate`;
/**
 * 删除活动
 * @type {string}
 */
export const deleteDashPath: string = `${rootURL}admin/activity/deleteById`;

/**
 * 用户列表
 * @type {string}
 */
export const getUserListPath: string = `${rootURL}admin/user/list`;
/**
 * 用户详情
 * @type {string}
 */
export const getUserInfoPath: string = `${rootURL}user/getById`;
/**
 * 修改用户
 * @type {string}
 */
export const updateUserPath: string = `${rootURL}admin/user/addOrUpdate`;

// 获取报名活动列表
export const getActivityListPath: string = `${rootURL}admin/activitySignup/list`;
// 运营拒绝
export const changeActivityStatusPath: string = `${rootURL}admin/activitySignup/update`;
// 修改报名活动状态
export const changeActivitySignupStatusPath = `${rootURL}admin/activitySignup/updateStatus`;
// 修改订单备注
export const updateRemarkPath = `${rootURL}admin/activitySignup/updateRemark`;
