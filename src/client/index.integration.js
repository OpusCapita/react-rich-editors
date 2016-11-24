var React = require('react');
var ReactDOM = require('react-dom');

(typeof window.React !== 'undefined') || (window.React = React);
(typeof window.react !== 'undefined') || (window.react = React);
(typeof window.ReactDOM !== 'undefined') || (window.ReactDOM = ReactDOM);
(typeof window['react-dom'] !== 'undefined') || (window['react-dom'] = ReactDOM);

var EmailRichEditor = require('./components/EmailRichEditor/EmailRichEditor.react').default;

const renderComponent = (component) => {
  return (domElement, props) => {
    ReactDOM.render(
      React.createElement(component, props),
      domElement);

    return () => {
      ReactDOM.unmountComponentAtNode(domElement);
    }
  };
};

module.exports = {
  renderEmailRichEditor: renderComponent(EmailRichEditor)
};
