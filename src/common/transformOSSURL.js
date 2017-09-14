
 import * as URL from '../core/WS/URL';
 import { GET } from '../core/WS/WSHandler';
 import * as CommonImgURL from '../common/CommonImgURL';
 const DEFAULTIMGSIZE = 1000;

 const getImgUrl = (
  url,
  type,
  width,
  height,
  resizeType,
  defaultErrorURL,
  // onError,
) => new Promise((resolve) => {
  let imgURL = url;
  if (url) {
    if (type === 'private') {
      imgURL = `${url}?x-oss-process=image/resize,m_${resizeType},w_${width},h_${height},limit_0`;
      GET(URL.getOssImgPath, { objectUrl: imgURL })
      .then(data => {
        if (data.code === '001') {
          resolve(data.data);
        } else {
          resolve(defaultErrorURL);
        }
      })
      .catch(err => {
        console.warn(err);
      });
    } else if (type === 'public') {
      resolve(imgURL);
    }
  } else {
    resolve(defaultErrorURL);
  }
});

/**
 * transformOSSURL 换取图片链接
 * params [object]
 * params.URL [string] 图片链接URL,
 * params.defaultErrorURL 错误图片URL
 * params.type [string] 'public' 'private',
 * params.resizeType: [string] 'lfit',
 * params.width [number] 图片宽度,
 * params.height [number] 图片高度,
 * params.onError [function],
 */

 const transformOSSURL = async (params = {} : Object) => {
   const url = 'URL' in params ? params.URL : '';
   const type = 'type' in params ? params.type : 'public';
   const width = 'width' in params ? params.width : DEFAULTIMGSIZE;
   const height = 'height' in params ? params.height : DEFAULTIMGSIZE;
   const resizeType = 'resizeType' in params ? params.resizeType : 'lfit';
   const defaultErrorURL = 'defaultErrorURL' in params ?
    params.defaultErrorURL : CommonImgURL.defalutError;
   const result = await getImgUrl(url, type, width, height, resizeType, defaultErrorURL);
   return result;
 };

 export default transformOSSURL;
