import React, { PropTypes } from 'react';
import Immutable from 'immutable';
// import ImageGallery from 'react-image-gallery';
import styles from '../../assets/stylesheets/CommonStyle/react-gallery.css';
import Image from './Image';
import ImageGallery from 'react-grid-gallery';

// const IMAGES =
//   [{
//     src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
//     thumbnail: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg',
//     thumbnailWidth: 320,
//     thumbnailHeight: 174,
//   }];
class Gallery extends React.Component {
  static propTypes = {
    // device: PropTypes.string.isRequired,
    imageSource: PropTypes.array.isRequired,
    // imgIndex: PropTypes.number,
    // imageShow: PropTypes.element,
    width: PropTypes.string,
    height: PropTypes.string,
    // style: PropTypes.any,
    // className: PropTypes.string,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     imageKey: 0,
  //   };
  // }
  // componentWillMount() {
  //   if (typeof this.props.imgIndex === 'number' &&
  //   this.props.imgIndex < this.props.imageSource.length) {
  //     this.setState({
  //       imageKey: this.props.imgIndex,
  //     });
  //   }
  // }
  // _renderImages() {
  //   if (this.props.device === 'pc') {
  //     const renderImgs = [];
  //     this.props.imageSource.forEach((img, index) => {
  //       renderImgs.push(
  //         <li className="imgLi" key={`li${index}`}>
  //           <a
  //             href="javascript:void(0);"
  //             onClick={() => {
  //               this.setState({
  //                 imageGalleryShow: true,
  //                 imageKey: index,
  //               });
  //             }}
  //             className="imgLink"
  //             key={`a${index}`}
  //           >
  //           {this.props.imageShow ? this.props.imageShow :
  //             <Image
  //               width={this.props.width ? this.props.width : '200'}
  //               height={this.props.height ? this.props.height : '120'}
  //               style={this.props.style}
  //               className={this.props.className}
  //               src={img.get('original')}
  //               key={index}
  //             />
  //           }
  //           </a>
  //         </li>
  //       );
  //     });
  //     return renderImgs;
  //   }
  //   return (
  //     <div>mobile</div>
  //   );
  // }
  _renderGallery() {
    let current = 0;
    return (
      <ImageGallery
        images={this.props.imageSource}
        enableImageSelection={false}
        onClickImage={(e) => {
          current = (current + 90) % 360;
          e.target.style.transform = `rotate(${current}deg)`;
        }}
        rowHeight={this.props.height}
      />
    );
  }
  render() {
    return this._renderGallery();
  }
}

export default Gallery;
