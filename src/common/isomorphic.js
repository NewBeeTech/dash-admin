let React;
let View;
let Text;
const isNative = !window.document;
/**
 * 判断是web的时候，重新赋值React
 */
// if (window.React) {
//   React = window.React;
// }
// Share.React = React;

/**
 * 做底层的兼容， 当然这里只是做了一个最简demo，具体实现的时候可能会对props做各种兼容处理
 */
if (!isNative) {
  React = require('react');
  View = (props) => <div {...props} />;
  Text = (props) => <p {...props} />;
} else {
  View = React.View;
  Text = React.Text;
}

export {
  View,
  Text,
};
