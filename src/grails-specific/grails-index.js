let EmailRichEditor = require('../client/components/EmailRichEditor').default;

module.exports = {
  renderHTMLEditor(domElement, props) {
    ReactDOM.render(<EmailRichEditor {...props}/>, domElement)

    return () => {
      ReactDOM.unmountComponentAtNode(domElement);
    }
  }
}
