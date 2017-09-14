
 import * as URL from '../core/WS/URL';
 import { GET } from '../core/WS/WSHandler';

 const getVoiceUrl = (url) => new Promise((resolve) => {
   if (url) {
     GET(URL.getOssVoicePath, { voiceUrl: url })
    .then(data => {
      if (data.code === '001') {
        resolve(data.data.voiceUri);
      } else {
        resolve();
      }
    })
    .catch(err => {
      console.warn(err);
    });
   } else {
     resolve();
   }
 });

/**
 * transformOSSVoiceURL 换取语音链接
 * params.URL [string] 语音链接URL,
 */

 const transformOSSVoiceURL = async (params = {} : Object) => {
   const url = 'URL' in params ? params.URL : '';
   const result = await getVoiceUrl(url);
   console.log(result);
   return result;
 };

 export default transformOSSVoiceURL;
