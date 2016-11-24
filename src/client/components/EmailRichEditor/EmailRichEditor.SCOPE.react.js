import React, { Component } from 'react';
import { showroomScopeDecorator } from 'jcatalog-showroom';

@showroomScopeDecorator
class EmailRichEditorSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = { html: '' };
  }

  handleHtml(html) {
    this.setState({ html });
  }

  render() {
    let { html } = this.state;
    return (
      <div>
        <div>
          {this._renderChildren()}
        </div>
        <div>
          <h5>Result html:</h5>
          <div>
            {html}
          </div>
        </div>
      </div>
    );
  }
}

export default EmailRichEditorSCOPE;
