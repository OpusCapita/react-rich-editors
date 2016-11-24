import { Component, PropTypes } from 'react';

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
    return this.props.children;
  }
}

ShortcutContainer.propTypes = {
  keyMap: PropTypes.object,
  handlers: PropTypes.object,
  targets: PropTypes.arrayOf(PropTypes.object),
  targetsExclude: PropTypes.arrayOf(PropTypes.object)
};
