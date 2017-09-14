
 import * as URL from '../../core/WS/URL';
 import { GET } from '../../core/WS/WSHandler';

 const Download = (url) => new Promise((resolve) => {
   if (url) {
     GET(URL.getOssImgPath, { objectUrl: url })
     .then(data => {
       if (data.code === '001') {
         resolve(data.data);
       }
     })
     .catch(err => {
       console.warn(err);
     });
   }
 });

 const PublicVoiceURL = async (voiceUrl : string) => {
   const result = await Download(voiceUrl);
   return result;
 };

 export default PublicVoiceURL;
