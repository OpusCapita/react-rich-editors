import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/showroom-client';
import Button from '@opuscapita/react-ui-buttons/lib/Button';
import keycode from 'keycode';

@showroomScopeDecorator
class KeysPressedSCOPE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keysPressed: [],
      keysPressedLog: []
    };
  }

  handleKeyUp(keysPressed, event) {
    this.setState({ keysPressed });
  }

  handleKeyDown(keysPressed, event) {
    let prevKeysPressedLog = this.state.keysPressedLog;
    let lastPressedKey = event.which;
    this.setState({
      keysPressed: keysPressed,
      keysPressedLog: [lastPressedKey].concat(prevKeysPressedLog)
    });
  }

  handleClearLog() {
    this.setState({ keysPressedLog: [] });
  }

  render() {
    let { keysPressed, keysPressedLog } = this.state;

    let resultRenderer = (title, keyCodes, transformFunc = (() => {})) => (
      <div style={{ flex: '1' }}>
        <div>
          <h5>{title}</h5>
        </div>
        <div style={{ height: '300px', overflow: 'auto' }}>
          {keyCodes.map((keyCode, index) => (
            <div style={{ display: 'flex' }} key={index}>
              <div style={{ marginRight: '12px' }}>
                <strong>Key: </strong>
                <span>{keyCode}</span>
              </div>
              <div>
                <strong>Name: </strong>
                <span>{transformFunc(keyCode)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div>
        <Button
          label="Clear Log"
          paper={true}
          onClick={this.handleClearLog.bind(this)}
          disabled={!keysPressedLog.length}
        />
        <div style={{ display: 'flex', paddingTop: '12px' }}>
          {resultRenderer(`Pressed keys (${keysPressed.length}) :`, keysPressed, keycode)}
          {resultRenderer(`Last pressed keys (${keysPressedLog.length}) :`, keysPressedLog, keycode)}
        </div>
        <div>
          {this._renderChildren()}
        </div>
      </div>
    );
  }
}

export default KeysPressedSCOPE;
