# CommonImage API

### :balloon: `Image`

参数 | 说明 | 数据结构 | 是否必传
------- | ----------- |:------:| :----:
device |设备类型 pc mobile|string| ✔️
src  | 图片URL | string | ✔️
width  | 图片宽度  | string |
height  | 图片高度  | string |
style  | 样式  | Object |
className | className | string |
onClick | 点击事件 | func |
errorURL | 图片加载失败后显示图片URL|string|

***

### :balloon: `OSSImage`
##### 通过图片共有链接获取私有链接，并展示图片
参数 | 说明 | 数据结构 | 是否必传
------- | ----------- |:------:| :----:
device |设备类型 pc mobile|string| ✔️
src  | 图片URL | string | ✔️
width  | 图片宽度  | string |
height  | 图片高度  | string |
style  | 样式  | object |
resizeType | 缩放类型 lfit:等比缩放,限制在设定在指定w与h的矩形内的最大图片;mfit:等比缩放,延伸出指定w与h的矩形框外的最小图片;fill:固定宽高,将延伸出指定w与h的矩形框外的最小图片进行居中裁剪;pad:固定宽高，缩略填充;fixed:固定宽高，强制缩略。   | string |
className | className  | string |
onClick | 点击事件  | func |
errorURL | 图片加载失败后显示图片URL | string |

图片缩放可参考[0SS图片处理手册](https://help.aliyun.com/document_detail/44688.html?spm=5176.doc32217.6.481.C5HBnu)

***

### :balloon: `Gallery`

参数 | 说明 | 数据结构 | 是否必传
------- | ----------- |------| :----:
device |设备类型 pc mobile|string| ✔️
imageSource  | 图片共有URL | Immutable.List([{ original: '大图URL',thumbnail: '小图URL'}]) | ✔️
imgIndex  | 放大展示图片的index  | number |
imageShow  | 图片展示组件，不传则默认使用Image组件  | element |
width  | 图片宽度  | string |
height  | 图片高度  | string |
style  | 样式  | object |
className | className  | string |

***

### :balloon: `CommonUpload`

参数 | 说明 | 数据结构 | 是否必传
------- | ----------- |------| :----:
device |设备类型 pc mobile|string| ✔️
multiple  | 是否支持多选 默认false | bool |
dir  | OSS文件路径 <br />血脂大赛：`blood_lipid/当前年月(格式YYYY_MM)`  <br />聊天图片：`chat_group/当前年月日(格式：YYYY_MM_DD)/当前小时(格式 HH)` <br />血脂大赛：`blood_lipid/当前年月(格式YYYY_MM)`  <br />档案图片：`health_record/当前年月日(格式：YYYY_MM_DD)/当前小时(格式 HH)`| string |
