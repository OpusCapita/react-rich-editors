/*
   What is a SCOPE file. See documentation here:
   https://github.com/OpusCapita/react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

@showroomScopeDecorator
export default
class MarkdownEditorScope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'rich'
    };
  }

  handleToggleMode() {
    console.log('hello!');
    this.setState({
      mode: this.state.mode === 'rich' ? 'plain' : 'rich'
    });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

MarkdownEditorScope.contextTypes = {
  i18n: PropTypes.object
};
MarkdownEditorScope.childContextTypes = {
  i18n: PropTypes.object
};
