import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'jcatalog-showroom';

function requireAll(requireContext) {
  return requireContext.keys().map(key => ({
    name: key.replace(/(\.svg$|^\.\/)/gi, ''),
    svg: requireContext(key)
  }));
}

@showroomScopeDecorator
class EmailRichEditorSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = { resultHtml: '' };
  }

  setResultHtml(string) {
    this.setState({ resultHtml: string });
  }

  render() {
    let { resultHtml } = this.state;
    return (
      <div>
        <div>
          {this._renderChildren()}
        </div>
        <h5>Result html:</h5>
        <div style={{ paddingTop: '24px' }}>
            {resultHtml}
        </div>
      </div>
    );
  }
}

export default EmailRichEditorSCOPE;
