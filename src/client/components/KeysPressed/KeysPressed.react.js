import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default
class KeysPressed extends Component {
  constructor(props) {
    super(props);
    this.state = { pressed: [] };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.flush = this.flush.bind(this);
  }

  componentDidMount() {
    let targets = this.getTargets(this.props.targets, this.props.listenChildren);
    this.addListeners(targets);
  }

  componentWillUnmount() {
    let targets = this.getTargets(this.props.targets, this.props.listenChildren);
    this.removeListeners(targets);
  }

  componentWillReceiveProps(nextProps) {
    let prevTargets = this.getTargets(this.props.targets, this.props.listenChildren);
    let nextTargets = this.getTargets(nextProps.targets, nextProps.listenChildren);
    this.updateListeners(prevTargets, nextTargets);
  }

  flush() {
    this.setState({ pressed: [] });
  }

  getTargets(targets, listenChildren) {
    if(listenChildren) {
      return [ ...targets, this._children ];
    }
    return targets;
  }

  addListeners(targets) {
    targets.map(target => {
      target.addEventListener('keydown', this.handleKeyDown);
      target.addEventListener('keyup', this.handleKeyUp);
    });
  }

  removeListeners(targets) {
    targets.map(target => {
      target.removeEventListener('keydown', this.handleKeyDown);
      target.removeEventListener('keyup', this.handleKeyUp);
    });
  }

  updateListeners(prevTargets, nextTargets) {
    this.removeListeners(prevTargets);
    this.addListeners(nextTargets);
  }

  handleKeyDown(event) {
    let { onKeyDown } = this.props;
    let { pressed } = this.state;
    let which = event.which;
    let isAlreadyPressed = pressed.find(key => key === which);
    let nextPressed = [];
    if(!isAlreadyPressed) {
      nextPressed = pressed.concat([which]);
      this.setState({ pressed: nextPressed });
      onKeyDown(nextPressed, event);
    }
  }

  handleKeyUp(event) {
    let { onKeyUp } = this.props;
    let { pressed } = this.state;
    let which = event.which;
    let indexOfPressed = pressed.indexOf(which);
    let isAlreadyPressed = indexOfPressed !== -1;
    let nextPressed = [];
    if(isAlreadyPressed) {
      nextPressed = []
        .concat(pressed.slice(0, indexOfPressed))
        .concat(pressed.slice(indexOfPressed + 1, pressed.length));
      this.setState({ pressed: nextPressed });
    }
    onKeyUp(nextPressed, event);
  }

  render() {
    let { listenChildren } = this.props;
    return (
      <div
        ref={ref => (this._children = ref) && listenChildren && this.addListeners([ref])}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        {this.props.children}
      </div>
    );
  }
}

KeysPressed.propTypes = {
  listenChildren: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object),
};
KeysPressed.defaultProps = {
  listenChildren: true,
  onKeyDown: () => {},
  onKeyUp: () => {},
  targets: []
};
