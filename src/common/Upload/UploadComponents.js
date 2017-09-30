import React, { PropTypes } from 'react';
import * as imgURL from '../CommonImgURL';
import Upload from 'rc-upload';
import styles from './upload.css';
import { UploadFileToOSS } from '../../core/WS/WSHandler';
import { Icon, message } from 'antd';
import moment from 'moment';
import amumu from 'amumu';
import Gallery from '../CommonImage/Gallery';
import Immutable from 'immutable';
import transformOSSURL from '../transformOSSURL';

/*
multiple: 是否可以多张上传
dir: 上传的目录
type: 私有 / 公有
imgURLArray: 图片路径 数组
isDelete: 是否可以删除
isDisable: 是否可以操作
onChange:
display: one / Multiple
 */
@amumu.redux.ConnectStore
@amumu.decorators.PureComponent
class UploadComponents extends React.Component {
  static defaultProps = {
    multiple: true,
    dir: `avatar/${moment().format('YYYY_MM')}`,
    type: 'public',
    isDelete: false,
    isDisable: false,
  };
  static propTypes = {
    multiple: PropTypes.bool,
    dir: PropTypes.string,
    type: PropTypes.string,
    imgURLArray: PropTypes.any,
    isDelete: PropTypes.bool,
    isDisable: PropTypes.bool,
    onChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      showImgs: [],
      display: '',
    };
  }
  componentWillMount() {
    this.getOSSImg(this.props.imgURLArray);
  }
  componentWillReceiveProps(nextProps) {
    const nextProp = nextProps.imgURLArray;
    const thisProps = this.props.imgURLArray;
    if (nextProp === '') {
      this.setState({ showImgs: [] });
      this.getOSSImg(nextProp);
    }
    if (nextProp !== thisProps && nextProp && nextProp !== '#') {
      this.getOSSImg(nextProp);
    }
  }
  getOSSImg(value) {
    const that = this;
    const valueType = typeof value;
    const arr = { string: 'one', object: 'multiple' };
    const display = arr[valueType];
    this.setState({ display });
    if (value && value !== '#') {
      let propsArr = [];
      // 传进来的数据是多张图片
      if (valueType === 'object') {
        propsArr = value;
      }
      // 传进来的数据是单张图片
      if (valueType === 'string') {
        propsArr = [value];
      }
      const promises = Promise.all(propsArr.map((image) =>
       transformOSSURL({ URL: image, type: this.props.type })));
      promises.then(result => {
        const showImgs = [];
        result.forEach((img) => {
          showImgs.push({
            url: img,
            type: 'success',
          });
        });
        that.setState({ showImgs });
      });
    }
  }
  // 删除图片操作
  removeImage(key) {
    const showImgs = this.state.showImgs;
    const thisImg = showImgs[key];
    showImgs.splice(key, 1);
    if (thisImg.type === 'success') {
      const display = this.state.display;
      if (display === 'one') {
        this.props.onChange('');
      }
      if (display === 'multiple') {
        const imgs = this.props.imgURLArray;
        imgs.splice(key, 1);
        this.props.onChange(imgs);
      }
    }
    this.setState({ showImgs });
  }
  render() {
    // 渲染图片
    const getImg = (file, key) => {
      return (
        <div className={ styles.uploadFileDiv } key={`div${key}`}>
          { !this.props.isDisable && this.props.isDelete && file.type !== 'load' ? (
            <img
              src={imgURL.RemoveImage}
              className={styles.removeIcon}
              onClick={() => this.removeImage(key)}
              key={`remove${key}`}
            />
          ) : ''}
          <div key={key}>
            <Gallery
              device="pc"
              width="100"
              height="100"
              imageSource={[{
                src: file.url,
                thumbnail: file.url,
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                caption: '点击图片进行旋转',
              }]}
            />
          </div>
        </div>
      );
    };
    // 显示图片
    const renderUploadFiles = (files) => {
      const renderFiles = [];
      if (files) {
        files.forEach((file, key) => {
          const Img = getImg(file, key);
          renderFiles.push(Img);
        });
      }
      return renderFiles;
    };
    const addImage = (fileURL, type, file = '') => {
      const display = this.state.display;
      if (display === 'one') {
        if (type === 'success') {
          console.log(fileURL);
          this.props.onChange(fileURL);
        }
        this.setState({ showImgs: [{ type, url: fileURL }] });
      }
      if (display === 'multiple') {
        const imgs = this.props.imgURLArray;
        const showImgs = this.state.showImgs;
        if (type !== 'success') {
          showImgs.push({ type, url: fileURL });
        } else {
          const length = showImgs.length;
          for (let i = 0; i < length; i++) {
            if (showImgs[i].type !== 'success') {
              showImgs[i] = { type, url: file };
              imgs.push(fileURL);
              break;
            }
          }
          this.props.onChange(imgs);
        }
        this.setState({ showImgs });
      }
    };
    // 上传操作
    const that = this;
    const uploaderProps = {
      multiple: this.props.multiple,
      beforeUpload(file) {
        addImage(imgURL.defalutLoading, 'load');
        const time = moment().format('X');
        const suffix = file.name.replace(/.+\./, '');
        const reg = new RegExp('^(JPEG|jpeg|JPG|jpg|GIF|gif|BMP|bmp|PNG|png)$');
        if (!reg.test(suffix)) {
          return message.error('上传必须为图片');
        }
        const result = UploadFileToOSS({
          dir: that.props.dir,
          filename: `${time}.${suffix}`,
          file,
        });
        result.then(fileInfo => {
          if (fileInfo.fileURL) {
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
              addImage(fileInfo.fileURL, 'success', fileReader.result);
            });
            fileReader.readAsDataURL(file);
          } else {
            // 上传失败的图片显示
            addImage(imgURL.defalutError, 'error');
          }
        });
      },
    };
    return (
      <div className={styles.uploadDiv}>
      {renderUploadFiles(this.state.showImgs)}
      { !this.props.isDisable ? (
        <Upload className={styles.upload} { ...uploaderProps}>
          <div className={styles.addFiles}>
            <Icon className={styles.addIcon} type="upload" />
          </div>
        </Upload>
      ) : ''}
      </div>
    );
  }
}

export default UploadComponents;
