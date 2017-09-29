/* @flow */
const rootURL: string = 'http://120.27.12.128:80/';

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
export const getDashListPath: string = `${rootURL}/admin/activity/list`;
/**
 * 活动详情
 * @type {string}
 */
export const dashInfoPath: string = `${rootURL}`;
/**
 * 新增活动
 * @type {string}
 */
export const addDashPath: string = `${rootURL}`;
/**
 * 修改活动
 * @type {string}
 */
export const updateDashPath: string = `${rootURL}`;
/**
 * 删除活动
 * @type {string}
 */
export const deleteDashPath: string = `${rootURL}`;



/**
 * 用户列表
 * @type {string}
 */
export const getUserListPath: string = `${rootURL}/admin/user/list`;
/**
 * 用户详情
 * @type {string}
 */
export const getUserInfoPath: string = `${rootURL}`;
/**
 * 修改用户
 * @type {string}
 */
export const updateUserPath: string = `${rootURL}`;

// 获取OSS签名
export const GetOSSSignature: string = `${rootURL}oss/sign`;
