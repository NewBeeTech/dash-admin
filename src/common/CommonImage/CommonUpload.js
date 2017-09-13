import React, { PropTypes } from 'react';
import * as imgURL from '../CommonImgURL';
import Upload from 'rc-upload';
import styles from '../../assets/stylesheets/CommonStyle/CommonUpload.css';
import { UploadFileToOSS } from '../../core/WS/WSHandler';
import Image from './Image';
import { Icon, Progress } from 'antd';
import moment from 'moment';

const TEN = 10;
const ONEHUMDRED = 100;
class CommonUpload extends React.Component {
  static propTypes = {
    device: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    dir: PropTypes.string,
    geturl: PropTypes.func,
    removeUrl: PropTypes.func,
    pattern: PropTypes.string, // single 只可上传一张
    editing: PropTypes.bool, // 是否可编辑
    defaultUrl: PropTypes.string, // 默认展现图片
  };
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
    };
  }
  componentWillMount() {
    if (this.props.defaultUrl) {
      const imgs = this.state.imgs;
      const newImgs = imgs.push({
        status: 100,
        showUrl: this.props.defaultUrl,
      });
      this.setState({
        imgs,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultUrl !== nextProps.defaultUrl && !this.props.defaultUrl) {
      const imgs = this.state.imgs;
      const newImgs = imgs.push({
        status: 100,
        showUrl: nextProps.defaultUrl,
      });
      this.setState({
        imgs,
      });
    }
  }
  render() {
    const setImgData = (file, showUrl, fileURL, status, key) => {
      const imgs = this.state.imgs;
      for (var img of imgs) {
        if (img.showUrl === imgURL.defalutLoading) {
          img.status = status;
          img.file = file;
          img.showUrl = showUrl;
          img.url = fileURL;
          break;
        }
      }
      if (typeof key !== 'undefined') {
        imgs[key].file = file;
        imgs[key].showUrl = showUrl;
        imgs[key].url = fileURL;
        imgs[key].status = status;
      }
      this.setState({
        imgs,
      });
    };
    const renderAddImg = () => {
      return (
        <div className={styles.addFiles}>
          <Icon className={styles.addIcon} type="upload" />
        </div>
      );
    };
    const removeImage = (key) => {
      const imgs = this.state.imgs;
      imgs.splice(key, 1);
      this.setState({
        imgs,
      });
      this.props.removeUrl(this.state.imgs);
    };
    const reUploadFiles = (status, file, key) => {
      if (status === 'error') {
        const result = UploadFileToOSS({
          dir: this.props.dir ? this.props.dir : `avatar/${moment().format('YYYY_MM')}`,
          filename: file.file.name,
          file: file.file,
        });
        result.then(fileInfo => {
          if (fileInfo.fileURL) {
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
              // 上传成功的图片显示
              console.log('上传成功');
              setImgData(file.file, fileReader.result, fileInfo.fileURL, ONEHUMDRED, key);
            });
            fileReader.readAsDataURL(file.file);
          } else {
            // 上传失败的图片显示
            setImgData(file.file, imgURL.defalutError, imgURL.defalutError, 'error', key);
          }
        });
      }
    };
    const renderReUpload = (status, file, key) => {
      if (status === 'error') {
        return (
          <div
            onClick={() => reUploadFiles(status, file, key)}
            className={styles.reUpload}
          >
            图片上传失败<br />
            点击重新上传<br />
          <Icon style={{ fontSize: '1.3em' }} type="reload" />
          </div>
        );
      }
      return false;
    };
    const renderProgress = (status) => {
      if (status === 'error') {
        return (
          <Progress
            strokeWidth={7}
            className={styles.addProgress}
            percent={90}
            status="exception"
          />
        );
      }
      if (typeof status === 'number') {
        return (
          <Progress
            strokeWidth={7}
            className={styles.addProgress}
            percent={status}
          />
        );
      }
      return false;
    };
    const renderUploadFiles = (files) => {
      // console.log(files);
      const renderFiles = [];
      if (files) {
        files.map((file, key) => {
          // console.log(file);
          renderFiles.push(
            <div className={ styles.uploadFileDiv } key={`div${key}`}>
              {this.props.editing ?
                <img
                  src={imgURL.RemoveImage}
                  className={styles.removeIcon}
                  onClick={() => removeImage(key)}
                  key={`remove${key}`}
                /> : ''}
              <Image
                className={styles.uploadFile}
                device={this.props.device} src={file.showUrl}
                key={key}
              />
              {this.props.editing ? renderReUpload(file.status, file, key) : ''}
              {this.props.editing ? renderProgress(file.status) : ''}
            </div>
          );
          return file;
        });
      }
      return renderFiles;
    };
    const setUploadBeforeImgData = (showUrl, status) => {
      const imgs = this.state.imgs;
      imgs.push({
        showUrl,
        status,
      });
      this.setState({
        imgs,
      });
    };

    // const addProgress = () => {
    //   let progressValue = 1;
    //   progressValue += TEN;
    //   console.log(progressValue);
    //   return progressValue;
    // };
    var wait = 1;
    const uploadTime = (totalTime) => {
      if (wait === ONEHUMDRED) {
        wait = ONEHUMDRED;
      } else {
        wait += TEN;
        setTimeout(() => {
          uploadTime();
        },
        totalTime / TEN);
      }
      console.log(wait);
      return wait;
    };
    const uploaderProps = {
      multiple: this.props.multiple,
      beforeUpload: (file) => {
        setUploadBeforeImgData(imgURL.defalutLoading, 1);
        const result = UploadFileToOSS({
          dir: `avatar/${moment().format('YYYY_MM')}`,
          filename: file.name,
          file,
        });
        const geturl = this.props.geturl;
        result.then(fileInfo => {
          if (fileInfo.fileURL) {
            geturl(fileInfo.fileURL);
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
              // 上传成功的图片显示
              setImgData(file, fileReader.result, fileInfo.fileURL, ONEHUMDRED);
            });
            fileReader.readAsDataURL(file);
          } else {
            // 上传失败的图片显示
            setImgData(file, imgURL.defalutError, imgURL.defalutError, 'error');
          }
        });
      },
    };
    return (
      <div className={styles.uploadDiv}>
        {renderUploadFiles(this.state.imgs)}
        {this.state.imgs.length >= 1 && this.props.pattern === 'single' ? '' :
          <Upload disabled={!this.props.editing} className={styles.upload} { ...uploaderProps}>
            {renderAddImg()}
          </Upload>
        }
      </div>
    );
  }
}

export default CommonUpload;
