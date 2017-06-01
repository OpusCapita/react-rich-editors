import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import Button from 'opuscapita-react-ui-buttons/lib/Button';

@showroomScopeDecorator
class MarkdownRichEditorSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
      locale: 'en'
    };
  }

  handleMarkdown(markdown) {
    this.setState({ markdown });
  }

  toggleLocale() {
    let prevLocale = this.state.locale;
    let nextLocale = prevLocale === 'en' ? 'de' : 'en';
    this.setState({ locale: nextLocale });
  }

  render() {
    let { markdown } = this.state;
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
          <h5>Result markdown:</h5>
          <div>
            {markdown}
          </div>
        </div>
      </div>
    );
  }
}

export default MarkdownRichEditorSCOPE;
