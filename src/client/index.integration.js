import React from 'react';
import ReactDOM from 'react-dom';

import EmailRichEditor from './components/EmailRichEditor/EmailRichEditor.react';

window.__React__ = React;
window.__ReactDOM__ = ReactDOM;

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
