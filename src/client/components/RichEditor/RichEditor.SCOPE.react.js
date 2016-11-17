import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from 'jcatalog-showroom';

function requireAll(requireContext) {
  return requireContext.keys().map(key => ({
    name: key.replace(/(\.svg$|^\.\/)/gi, ''),
    svg: requireContext(key)
  }));
}

let icons = requireAll(require.context( '!!raw-loader!jcatalog-svg-icons/lib', true, /.*\.svg$/));

@showroomScopeDecorator
class RichEditorSCOPE extends Component {
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

export default RichEditorSCOPE;
