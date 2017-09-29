/* @flow weak */

// import fetchp from 'fetch-jsonp';
// import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-polyfill');
// import 'whatwg-fetch';
import * as URL from './URL';
import userInfoStorage from '../UserInfoStorage';
import { random_string } from '../Util';
import NotificationCenter from '../../common/NotificationCenter';


/**
 * 将Object转为url params string
 * @param params
 * @returns {string}
 * @private
 */
const _param = (params: {}): string => {
  return Object.keys(params).map((key) => {
    if(params[key]) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    }
  }).join('&');
};

export const GET = async (path: string, params = {}) => {
  const paramsWithToken = Object.assign(
    {},
    params,
  );
  const RequestURL = `${path}?${_param(paramsWithToken)}`;
  // console.log('RequestURL', RequestURL);
  try {
    const response = await fetch(RequestURL, {
      method: 'GET',
      headers: {
      },
      mode: 'cors',
      // credentials: 'include',
    });
    if (response.status >= 500 && response.status < 600) {
      NotificationCenter.NotificationCard(
        '请求错误',
        '我们正在努力修复中....',
        'error',
        3,
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
    return {
      message: err,
    };
  }
};

export const POSTJSON = async (path: string, json = {}) => {
  const RequestURL = path;
  const paramsWithToken = Object.assign({}, json);
  const body = _param(paramsWithToken);
  try {
    const response = await fetch(RequestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
      credentials: 'include',
    });
    if (response.status >= 500 && response.status < 600) {
      NotificationCenter.NotificationCard(
        '请求错误',
        `我们正在努力修复中....${response.status}`,
        'error',
        3,
      );
    }
    const result = await response.json();
    // console.log('postjson webservice result: ', result);
    return result;
  } catch (err) {
    // console.log(err);
    // console.warn(`WSHandler -> POSTJSON -> err: ${err}`);
    return {
      message: err,
    };
  }
};

export const GETURL = (path: string, params : Object = {}) => {
  const paramsWithToken = Object.assign(
    {},
    params,
  );
  const RequestURL = `${path}?${_param(paramsWithToken)}`;
  return RequestURL;
};

export const Upload = (baseURL, params, filename, file) => new Promise((resolve, reject) => {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  if (params) {
    Object.keys(params).map(key => {
      formData.append(key, params[key]);
      return key;
    });
  }
  formData.append('file', file);
  xhr.onload = () => {
  };

  xhr.open('post', baseURL, true);

  if (xhr.upload) {
     // 上传进度
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        e.percent = Math.round(e.loaded / e.total * 100 );
      }
    };
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        resolve('');
      }
    }
  };
  const headers = params.headers || {};
  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);
});


export const UploadFileToOSS = async (params = {}) => {
  let signature = await GET(URL.GetOSSSignature, params);
  signature = signature.data;
  const localName = `${random_string(6)}-${params.filename}`;
  let fileURL = `${signature.host}/${signature.dir}${localName}`;
  fileURL = encodeURI(fileURL);

  const uploadParams = {
    name: params.filename,
    key: `${signature.dir}${localName}`,
    policy: signature.policy,
    OSSAccessKeyId: signature.accessid,
    success_action_status: '200',
    signature: signature.signature,
  };
  const uploadResult = await Upload(signature.host, uploadParams, localName, params.file);

  const result = {
    filename: params.filename,
    fileURL,
  };
  console.log(result);
  return result;
};
