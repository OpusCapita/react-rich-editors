import React, { Component } from 'react';
import { showroomScopeDecorator } from 'opuscapita-showroom-client';
import Button from 'opuscapita-react-ui-buttons/lib/Button'

function requireAll(requireContext) {
  return requireContext.keys().map(key => ({
    name: key.replace(/(\.svg$|^\.\/)/gi, ''),
    svg: requireContext(key)
  }));
}

let icons = requireAll(require.context('!!raw-loader!opuscapita-ui-svg-icons/lib', true, /.*\.svg$/));

@showroomScopeDecorator
class RichEditorSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons,
      containerStyle: {},
      locale: 'de'
    };
  }

  getIcon(name) {
    return this.state.icons.find(icon => icon.name === name).svg;
  }

  toggleLocale() {
    let prevLocale = this.state.locale;
    let nextLocale = prevLocale === 'en' ? 'de' : 'en';
    this.setState({ locale: nextLocale });
  }

  render() {
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
      </div>
    );
  }
}

export default RichEditorSCOPE;
