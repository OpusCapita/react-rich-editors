import React, { Component } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';

function requireAll(requireContext) {
  return requireContext.keys().map(key => ({
    name: key.replace(/(\.svg$|^\.\/)/gi, ''),
    svg: requireContext(key)
  }));
}

let icons = requireAll(require.context('!!raw-loader!opuscapita-ui-svg-icons/lib', true, /.*\.svg$/));

@showroomScopeDecorator
class RichEditorToolbarSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons,
      containerStyle: {},
      options: {
        isPaper: false
      }
    };
  }

  getIcon(name) {
    return this.state.icons.find(icon => icon.name === name).svg
  }

  toggleOption(name) {
    this.setState({
      options: { ...this.state.options, [name]: !this.state.options[name] }
    });
  }

  render() {
    return (
      <div>
        <div>
          {this._renderChildren()}
        </div>
      </div>
    );
  }
}

export default RichEditorToolbarSCOPE;
