import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import styles from './gallery.css';
import Image from './Image';
import ImageGallery from 'react-grid-gallery';

class Gallery extends React.Component {
  static propTypes = {
    imageSource: PropTypes.array.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
  };
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
