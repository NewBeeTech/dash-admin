import React from 'react';

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      second: props.second,
    };
  }
  componentWillMount() {
    this.setState({
      second: this.props.second,
    });
    this.state.timer = setInterval(() => {this.decreaseSecond();}, 1000);
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.second !== this.props.second) {
      this.state.second = nextProps.second;
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
  decreaseSecond() {
    if (this.state.second < 0) {
      clearInterval(this.state.timer);
    }
    this.setState({
      second: this.state.second - 1,
    });
  }
  getTime() {
    if (this.state.second >= 0) {
      let s = this.state.second % 60;
      let m = parseInt(this.state.second / 60, 10);
      if (this.state.second % 60 < 10) {
        s = `0${this.state.second % 60}`;
      }
      if (parseInt(this.state.second / 60, 10) < 10) {
        m = `0${parseInt(this.state.second / 60, 10)}`;
      }
      return `还有${m}:${s}发送`;
    }
    return '已发送';
  }
  render() {
    return (
      <div>
        {this.getTime()}
      </div>
    );
  }
}
