import React, { PropTypes } from 'react';
import Image from './Image';
import transformOSSURL from '../transformOSSURL';

const ONEHUNDRED = 100;
class OSSImage extends React.Component {
  static propTypes = {
    device: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    resizeType: PropTypes.string,
    style: PropTypes.any,
    onClick: PropTypes.func,
    className: PropTypes.any,
    errorURL: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      src: '#',
    };
  }
  componentWillMount() {
    this.getOSSURL();
  }
  async getOSSURL () {
    const params = {
      URL: this.props.src,
      type: 'private',
      resizeType: this.props.resizeType ? this.props.resizeType : 'lfit',
      width: this.props.width ? this.props.width : ONEHUNDRED,
      height: this.props.height ? this.props.height : ONEHUNDRED,
    };
    const result = await transformOSSURL(params);
    this.setState({
      src: result,
    });
  }
  render() {
    return (
      <Image
        device={this.props.device}
        onClick={this.props.onClick}
        width={this.props.width}
        height={this.props.height}
        src={this.state.src}
        errorURL={this.props.errorURL}
      />
    );
  }
}

export default OSSImage;
