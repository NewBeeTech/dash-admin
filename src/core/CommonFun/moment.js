/**
 * Created by wl on 16/7/8.
 */
import moment from 'moment';
/**
 *@formatDate 格式化时间 将时间由object对象变成字符串
 *@params
 *        objTime: object 时间格式
 *return string: 返回string时间格式 Y-m-d H:i:s
 **/
export const formatDate = (objTime) => {
  return objTime ? moment(objTime).format('YYYY-MM-DD HH:mm:ss') : '';
};

/**
 *@formatDateByType 格式化时间 将时间根据type 由object对象变成字符串
 *@params
 *          objTime: object时间 Y-m-d,
 *          type:  start(开始时间) end(结束时间)
 *return string (Y-m-d 00:00:00 -- Y-m-d 23:59:59)
**/
export const formatDateByType = (objTime, type) => {
  if (objTime) {
    if (type === 'start') {
      return moment(objTime).format('YYYY-MM-DD 00:00:00');
    } else if (type === 'end') {
      return moment(objTime).format('YYYY-MM-DD 23:59:59');
    }
  }
  return '';
};

/**
 *@showDefaultValueTime 获取默认时间
 *@params
 *       type: start(开始时间) end(结束时间)
 *return string (当月1号的0点 到 此刻)
**/
export const showDefaultValueTime = (type) => {
  if (type === 'start') {
    return moment().format('YYYY-MM-01 00:00:00');
  } else if (type === 'end') {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
};

/**
 *@showDefaultValueDate 获取默认日期
 *@params
 *       type: start(开始时间) end(结束时间)
 *return string (当月1号 到 今天)
**/
export const showDefaultValueDate = (type) => {
  if (type === 'start') {
    return moment().format('YYYY-MM-01');
  } else if (type === 'end') {
    return moment().format('YYYY-MM-DD');
  }
  return '';
};

/**
 *@formatBrithday 获取出生年月日
 *@params
 *       objDate: object日期
 *return string (Y-m-d)
**/
export const formatBrithday = (objDate) => {
  return objDate ? moment().format('YYYY-MM-DD') : '';
};

/**
 *@getWholeHalfDate 获取整点和半点
 *@params
 *       objTime: object时间
 *return string (H:i)（如返回： 12:30  12:00）
**/
export const getWholeHalfDate = (objTime) => {
  return objTime ? moment().format('HH:mm') : '';
};

const TIME = 60;
export const conversionTime = (time: number) => {
  if (time >= TIME) {
    const min = Math.floor(time / TIME);
    const second = time % TIME;
    if (min >= TIME) {
      const hour = Math.floor(min / TIME);
      const minTime = min % TIME;
      return `${hour}时${minTime}分${second}秒`;
    }
    return `${min}分${second}秒`;
  }
  return `${time}秒`;
};


/*
** 获取时间格式
** 如果小于当天的零点，显示具体时间
** 如果大于当天的零点，显示年月日
 */
export const getLastTime = (time: string|number) => {
  if (!time) {
    return '';
  }
  const today = moment().format('YYYY/MM/DD 00:00:00');
  const toDayTimeStamp = moment(today).valueOf();
  const date = moment(time).valueOf();
  if (date > toDayTimeStamp) {
    return moment(time).format('HH:mm');
  }
  return moment(time).format('YYYY-MM-DD');
};
