/* @flow */
import { dispatch } from '../../store';
import * as IMAction from '../../actions/IMAction';
/* global someFunction RongIMClient:true */
/* global someFunction RongIMLib:true */
RongIMClient.init(process.env.rongcloudAppKey, null, {voiceLibamr:'https://cdn.ronghub.com/libamr-2.0.13.min.js'});
RongIMLib.RongIMVoice.init();
import userInfoStorage from '../UserInfoStorage';

RongIMClient.setConnectionStatusListener({
  onChanged: function (status) {
    switch (status) {
      // 链接成功
      case RongIMLib.ConnectionStatus.CONNECTED:
        console.log('链接成功');
        break;
      // 正在链接
      case RongIMLib.ConnectionStatus.CONNECTING:
        console.log('正在链接');
        break;
      // 重新链接
      case RongIMLib.ConnectionStatus.DISCONNECTED:
        console.log('断开连接');
        break;
      // 其他设备登录
      case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
        console.log('其他设备登录');
        break;
      // 网络不可用
      case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
        console.log('网络不可用');
        break;
    }
  },
});

 // 消息监听器
export type messageType = {
   content: { // 消息内容
     extra: ?string,
     messageName: 'TextMessage',
   },
   conversationType: number, // 会话类型
   extra: ?string, // 附件消息
   isLocalMessage: ?boolean,
   messageDirection: number, // 消息方向
   messageId: string, // 消息Id
   messageType: 'TextMessage', // 消息类型
   messageUId: string,
   objectName: string, // 内置消息名称
   offLineMessage: boolean,
   receiptResponse: ?string,
   receivedStatus: number, // 消息接收状态
   receivedTime: number, // 消息接收时间
   senderUserId: string, // 发送者Id
   sentStatus: string,  // 消息发送状态
   sentTime: number, // 消息发送时间
   targetId: string, // 目标Id
 };

 RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message: messageType) {
      // 判断消息类型
      switch(message.messageType){
        case RongIMClient.MessageType.TextMessage:
          dispatch(IMAction.recevieMessage(message));
          // 发送的消息内容将会被打印
          console.log(message.content.content);
          console.warn(message);
          break;
        case RongIMClient.MessageType.VoiceMessage:
          // 对声音进行预加载
          // message.content.content 格式为 AMR 格式的 base64 码
          // RongIMLib.RongIMVoice.preLoaded(message.content.content);
          console.warn(message);
          dispatch(IMAction.recevieMessage(message));
          break;
        case RongIMClient.MessageType.ImageMessage:
          console.warn(message);
          dispatch(IMAction.recevieMessage(message));
          // do something...
          break;
        case RongIMClient.MessageType.DiscussionNotificationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.LocationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.RichContentMessage:
          // do something...
          break;
        case RongIMClient.MessageType.DiscussionNotificationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.InformationNotificationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.ContactNotificationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.ProfileNotificationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.CommandNotificationMessage:
          // do something...
          break;
        case RongIMClient.MessageType.CommandMessage:
          // do something...
          break;
        case RongIMClient.MessageType.UnknownMessage:
          // do something...
          break;
        default:
          // 自定义消息
          // do something...
      }
    }
});

export function getRongcloudToken() {
  const rongcloudAccount = JSON.parse(userInfoStorage.getItem('rongcloudAccount'));
  let token = '';
  try {
    token = rongcloudAccount.token;
  } catch (e) {
    alert('请重新登录,刷新才能聊天');
  }
  return token;
}

export function disconnect() {
  RongIMClient.getInstance().disconnect();
}

export function connect(token) {
  RongIMClient.connect(token, {
    onSuccess: (userId) => {
      console.log(`Login successfully.${userId}`);
    },
    onTokenIncorrect: () => {
      console.log('token无效');
      alert('聊天过期，请重新登录');
    },
    onError: (errorCode) => {
      let info = '';
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = '超时';
          break;
        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          info = '未知错误';
          break;
        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
          info = '不可接受的协议版本';
          break;
        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
          info = 'appkey不正确';
          break;
        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
          info = '服务器不可用';
          break;
      }
      console.log(errorCode);
    },
  });
}

export function sendMessage(targetId, content, type) {
  const conversationtype = RongIMLib.ConversationType.GROUP;
  let msg;
  if (type === 'TextMessage') {
    msg = new RongIMLib.TextMessage({ content });
  }
  if (type === 'ImageMessage') {
    msg = new RongIMLib.ImageMessage({ ...content });
  }
  RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
    onSuccess (message) {
      // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
      console.log("Send successfully");
    },
    onError: function (errorCode,message) {
      var info = '';
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = '超时';
          break;
        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          info = '未知错误';
          break;
        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
          info = '在黑名单中，无法向对方发送消息';
          break;
        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
          info = '不在讨论组中';
        break;
        case RongIMLib.ErrorCode.NOT_IN_GROUP:
          info = '不在群组中';
          break;
        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
          info = '不在聊天室中';
          break;
        default :
          info = '';
          break;
      }
      console.log(`发送失败:${info}`);
    },
  }
        );
}
