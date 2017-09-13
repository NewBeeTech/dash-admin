import * as Immutable from 'immutable';

type messageType = Immutable.Map<>;

export const messageDirection = {
  wechat: 1,
  app: 2,
  system: 3,
  sendGroup: 4, // 群发
};

// message type should be immutable map
function _checkMessageType(message: messageType): boolean {
  if (message instanceof Immutable.Map) {
    return true;
  }
  console.error(message, 'message should be immutable type');
  return false;
}

export function isVoice(message: messageType): boolean {
  if (!_checkMessageType(message)) return false;
  try {
    return message.get('messageType') === 'VoiceMessage'
    || message.get('content').get('type') === 'RC:VcMsg';
  } catch (e) {
    console.warn(e);
    return false;
  }
}

export function isSystem(message: messageType): boolean {
  if (!_checkMessageType(message)) return false;
  try {
    return message.get('messageDirection') === messageDirection.system;
  } catch (e) {
    console.warn(e);
    return false;
  }
}

export function isText(message: messageType): boolean {
  if (!_checkMessageType(message)) return false;
  if (isSystem(message)) return false;
  try {
    return message.get('messageType') === 'TextMessage'
    || message.get('content').get('type') === 'RC:TxtMsg';
  } catch (e) {
    console.warn(e);
    return false;
  }
}


export function isImage(message: messageType): boolean {
  if (!_checkMessageType(message)) return false;
  try {
    return message.get('messageType') === 'ImageMessage'
    || message.get('content').get('type') === 'RC:ImgMsg';
  } catch (e) {
    console.warn(e);
    return false;
  }
}

export function isRemoteHistory(message: messageType): boolean {
  if (!_checkMessageType(message)) return false;
  try {
    return message.get('remoteHistory');
  } catch (e) {
    console.warn(e);
    return false;
  }
}
