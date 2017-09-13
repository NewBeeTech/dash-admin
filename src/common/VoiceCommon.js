import React from 'react';
import * as commonImgURL from './CommonImgURL';
import Voice1 from '../assets/images/voice1.svg';
import Voice2 from '../assets/images/voice2.svg';
import Voice3 from '../assets/images/voice3.svg';
import * as styles from '../assets/stylesheets/IM/voiceStyle.css';

class VoiceCommon extends React.Component {
  state: {
    playFlag: boolean,
    playProgress: number,
    timer: number,
    duration: number,
    width: number,
  };
  state = {
    playFlag: false,
    playProgress: 0,
    timer: null,
    duration: 0,
    width: 50,
  };
  componentWillMount() {
    RongIMLib.RongIMVoice.preLoaded(this.props.source);
    const duration = Math.ceil(this.props.source.length / 1024);
    const width = duration * 20;
    this.setState({ duration, width });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.source !== nextProps.source && nextProps.source) {
      const duration = Math.ceil(nextProps.source.length / 1024);
      const width = duration * 20;
      this.setState({ duration, width });
    }
  }
  componentWillUnmount() {
    this.stopVoice();
  }
  props: {
    voiceDuration: number, // 声音时长
    source: string, // 声音资源
    play: (source: string, finishedCallBack: Function) => void, // 播放声音
    stop: Function, // 暂停声音
  };
  showImg() {
    const playNumber = this.state.playProgress % 3;
    const playFlag = this.state.playFlag;
    if (playFlag) {
      if (playNumber === 0) {
        return (<Voice1 className={styles.voiceStyle} />);
      }
      if (playNumber === 1) {
        return (<Voice2 className={styles.voiceStyle} />);
      }
      if (playNumber === 2) {
        return (<Voice3 className={styles.voiceStyle} />);
      }
    } else {
      return <Voice3 className={styles.voiceStyle} />;
    }
    return '';
  }
  stopVoice() {
    RongIMLib.RongIMVoice.stop(this.props.source);
    clearInterval(this.state.timer);
    this.setState({ playFlag: false, playProgress: 0 });
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
            <div
              onClick={() => {
                const playFlag = !this.state.playFlag;
                this.setState({ playFlag });
                if (playFlag) {
                  // 计时器
                  const duration = this.state.duration;
                  const timer = setInterval(() => {
                    const playProgress = this.state.playProgress + 1;
                    if (playProgress <= duration) {
                      this.setState({ playProgress });
                    } else {
                      this.stopVoice()
                      return;
                    }
                  }, 1000);
                  this.setState({ timer });
                  RongIMLib.RongIMVoice.play(this.props.source, duration);
                } else {
                  this.stopVoice();
                }
              }}
              className={styles.voiceContent}
              style={{ width: this.state.width, maxWidth: '300px', minWidth: '50px' }}
            >
              {this.showImg()}
            </div>
            <div>{this.state.duration}s</div>
            </div>
    );
  }
}

export default VoiceCommon;
