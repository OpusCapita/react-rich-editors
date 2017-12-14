/* eslint-env browser */
let React = require('react');
let ReactDOM = require('react-dom');

if (typeof window.React !== 'undefined') {
  window.React = React;
}
if (typeof window.react !== 'undefined') {
  window.react = React
}
if (typeof window.ReactDOM !== 'undefined') {
  window.ReactDOM = ReactDOM
}
if (typeof window['react-dom'] !== 'undefined') {
  window['react-dom'] = ReactDOM;
}

let scope = typeof global !== "undefined" ? global : self;
if (!scope._babelPolyfill) {
  require("babel-polyfill");
}

let EmailRichEditor = require('./components/EmailRichEditor/EmailRichEditor.react').default;

const renderComponent = component => {
  return (domElement, props) => {
    let reactElement = React.createElement(component, props);
    ReactDOM.render(reactElement, domElement);

    return () => {
      ReactDOM.unmountComponentAtNode(domElement);
    }
  };
};

module.exports = {
  renderEmailRichEditor: renderComponent(EmailRichEditor)
};
