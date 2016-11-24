import React, { Component, PropTypes } from 'react';

export default
class ShortcutContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setShortcuts();
  }

  componentWillUnmount() {
    this.unsetShortcuts();
  }

  setShortcuts() {

  }

  unsetShortcuts() {

  }

  render() {
    let {
      keyMap, // eslint-disable-line no-unused-vars
      handlers, // eslint-disable-line no-unused-vars
      targets, // eslint-disable-line no-unused-vars
      targetsExclude, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    return (
      <div { ...restProps }>
        {this.props.children}
      </div>
    );
  }
}

ShortcutContainer.propTypes = {
  keyMap: PropTypes.object,
  handlers: PropTypes.object,
  targets: PropTypes.arrayOf(PropTypes.object),
  targetsExclude: PropTypes.arrayOf(PropTypes.object)
};
