
/**
 * Created by wangxiaodan on 16/5/9.
 */
import React, { PropTypes } from 'react';
import * as Immutable from 'immutable';
import { View } from 'isomorphic';
import DefaultImg from '../assets/images/defaultImg.svg';
import Gallery from './CommonImage/Gallery';
import transformOSSURL from './transformOSSURL';


class GetOssImgCommon extends React.Component {
  static defaultProps = {
    imgStyle: { width: '100', height: '100' },
    type: 'public',
  };
  static propTypes = {
    img: PropTypes.string.isRequired,
    imgStyle: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    // getUrl: PropTypes.func,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      ossImgUrl: '#',
    };
  }
  state: {
    ossImgUrl: string | Array,
  }
  componentWillMount() {
    this.getImgUrl(this.props.img);
  }
  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.img === 'string') {
      if (nextProps.img !== this.props.img) {
        this.getImgUrl(nextProps.img);
      }
    }
    if (typeof nextProps.img === 'object') {
      if (nextProps.img.toString() !== this.props.img.toString()) {
        // this.state.ossImgUrl = [];
        // this.setState(
        //   { ...this.state },
        this.getImgUrl(nextProps.img);
        // );
      }
    }
  }
  componentWillUnmount() {
    this.setState({ ossImgUrl: '#' });
  }
  getImgUrl(img) {
    if (typeof img === 'string' && img && img !== '#' && img !== '') {
      this.setState({ ossImgUrl: '#' });
      transformOSSURL({ URL: img, type: this.props.type })
      .then(result => {
        this.setState({
          ossImgUrl: result,
        });
      });
    }
    if (typeof img === 'object' && img.length) {
      this.setState({ ossImgUrl: [] });
      let ossImgUrl = this.state.ossImgUrl;
      img.map((item, index) => {
        if (item.indexOf('Signature') === -1) {
          transformOSSURL({ URL: item, type: this.props.type })
          .then(result => {
            if (ossImgUrl === '#') ossImgUrl = [];
            ossImgUrl.push(result);
            this.state.ossImgUrl = ossImgUrl;
            this.setState({
              ...this.state,
            });
            // this.props.getUrl(ossImgUrl);
          });
        }
      });
    }
  }
  props: {
    img: string | Array,
    imgStyle: Object,
    type: string,
    // getUrl: Function,
  }
  showImg(ossImgUrl) {
    if (ossImgUrl === '#' || ossImgUrl === '') {
      return (
        <View>
          <DefaultImg
            style={ this.props.imgStyle }
          />
        </View>
      );
    }
    if (typeof ossImgUrl === 'object' && ossImgUrl.length) {
      const datas = [];
      ossImgUrl.map((list) => {
        return datas.push({
          src: list,
          thumbnail: list,
          thumbnailWidth: this.props.imgStyle.width,
          thumbnailHeight: this.props.imgStyle.width,
          caption: '点击图片进行旋转',
        });
      });
      return (
        <div>
          <Gallery
            imageSource={datas}
            height={this.props.imgStyle.width}
          />
        </div>
      );
    }
    return (
      <div style={{ position: 'relative' }}>
        <Gallery
          imageSource={[{
            src: this.state.ossImgUrl,
            thumbnail: this.state.ossImgUrl,
            thumbnailWidth: this.props.imgStyle.width,
            thumbnailHeight: this.props.imgStyle.width,
            caption: '点击图片进行旋转',
          }]}
          height={this.props.imgStyle.width}
        />
      </div>
    );
  }
  render() {
    return (
      <View>
        {this.showImg(this.state.ossImgUrl)}
      </View>
    );
  }
}

export default GetOssImgCommon;
