import React, { PropTypes } from 'react';
import styles from './gallery.css';
import * as imgURL from '../CommonImgURL';

class Image extends React.Component {
  static propTypes = {
    device: PropTypes.string,
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    style: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.any,
    errorURL: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      imageSource: imgURL.defalutLoading,
    };
    this.handleImageErrored = this.handleImageErrored.bind(this);
  }
  componentWillMount() {
    this.state = {
      imageSource: this.props.src ? this.props.src : imgURL.defalutLoading,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.src) {
      this.setState({
        imageSource: nextProps.src,
      });
    }
  }
  handleImageErrored() {
    this.setState({
      imageSource: this.props.errorURL ? this.props.errorURL : imgURL.defalutError,
    });
  }
  _renderImages(imageSource) {
    const width = this.props.width ? `${this.props.width}px` : '100px';
    const height = this.props.height ? `${this.props.height}px` : '100px';
    const stylesheets = Object.assign({ width, height }, this.props.style);
    return (
      <div
        style={stylesheets}
        className={`${this.props.className} ${styles.imgBox}`}
      >
        <a href="javascript:void(0);">
          <img
            onError={this.handleImageErrored}
            src={imageSource}
          />
        </a>
      </div>
    );
  }
  render() {
    return (
      <div
        onClick={
          this.props.onClick
        }
        className={styles.imgBody}
      >
        {this._renderImages(this.state.imageSource ? this.state.imageSource : imgURL.defalutError)}
      </div>
    );
  }
}

export default Image;
