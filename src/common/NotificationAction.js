/**
 * Created by wangxiaodan on 7/11/2016.
 */
 import React from 'react';
 import { notification, Icon } from 'antd';
 // import { Toast } from 'antd-mobile';

 /**
  * @param type 类型 (success, fail, info)
  * @param device 设备( mobile, pc)
  * @param title 标题头
  * @param content 描述
  * @param icon 图标
  * @param during 持续时间
  * @param onClose 关闭回调函数
  */
 const SHOWTIME = 3;

 export const SUCCESS = 'SUCCESS';
 export const FAIL = 'FAIL';
 export const INFO = 'INFO';
 const NotificationAction = (params: Object) => (dispatch) => {
   dispatch({ type: params.type });
   if (params.device === 'pc') {
     let type = '';
     switch (params.type) {
       case SUCCESS:
         type = 'success';
         break;
       case FAIL:
         type = 'error';
         break;
       case INFO:
         type = 'info';
         break;
       default:
         break;
     }
     notification[type]({
       message: 'title' in params ? params.title : `${type}`,
       description: 'content' in params ? params.content : '',
       duration: 'during' in params ? params.during : SHOWTIME,
       icon: 'icon' in params ? <Icon type={params.icon} style={{ color: '#2db7f5' }} /> : '',
       onClose: 'onClose' in params ? params.onClose : '',
     });
   }
 };

 export default NotificationAction;
