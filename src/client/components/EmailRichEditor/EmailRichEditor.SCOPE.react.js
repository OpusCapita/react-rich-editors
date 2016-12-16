import React, { Component } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';
import Button from 'opuscapita-react-ui-buttons/lib/Button'

@showroomScopeDecorator
class EmailRichEditorSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      locale: 'en'
    };
  }

  handleHtml(html) {
    this.setState({ html });
  }

  toggleLocale() {
    let prevLocale = this.state.locale;
    let nextLocale = prevLocale === 'en' ? 'de' : 'en';
    this.setState({ locale: nextLocale });
  }

  render() {
    let { html } = this.state;
    return (
      <div>
        <div style={{ marginBottom: '12px' }}>
          <Button
            label="Toggle locale"
            onClick={this.toggleLocale.bind(this)}
            bgColor="#e70"
            color="#fff"
          />
        </div>
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
