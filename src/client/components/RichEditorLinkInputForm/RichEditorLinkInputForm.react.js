import React, { Component, PropTypes } from 'react';
import s from './RichEditorLinkInputForm.module.less';
import HotKeyButton from 'jcatalog-react-ui-buttons/lib/Button';
import ShortcutContainer from '../ShortcutContainer';
let cancelIcon = require('!!raw!jcatalog-svg-icons/lib/cancel.svg');

export default
class RichEditorLinkInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  focus() {
    this._input.focus();
  }

  clearUrlValue() {
    this.setState({ url: '' });
  }

  handleInputChange(name, event) {
    let nextValue = event.target.value;
    this.setState({ [name]: nextValue });
  }

  render() {
    let { translations, linkLabel, applyLabel, cancelLabel, onHide, onLink } = this.props;
    let { url } = this.state;

    let keyMap = { hide: ['Escape'] };
    let handlers = { hide: this.props.onHide }

    return (
      <ShortcutContainer keyMap={keyMap} handlers={handlers}>
        <div className={s.richEditorLinkInputForm}>
          <div className={s.form}>
            <input
              ref={ref => (this._input = ref)}
              className={s.input}
              placeholder={linkLabel}
              onChange={event => this.handleInputChange.call(this, 'url', event)}
              value={url}
            />
          </div>
          <div className={s.buttonsBlock}>
            <div className={s.applyButton}>
              <HotKeyButton
                label={applyLabel}
                bgColor="#66bb6a"
                color="#fff"
                paper={true}
                onClick={onLink}
              />
          </div>
            <div className={s.cancelButton}>
              <HotKeyButton
                label={cancelLabel}
                bgColor="#e70"
                color="#fff"
                paper={true}
                onClick={onHide}
              />
            </div>
          </div>
        </div>
      </ShortcutContainer>
    );
  }
}

RichEditorLinkInputForm.propTypes = {
  linkLabel: PropTypes.string,
  onHide: PropTypes.func,
  onLink: PropTypes.func,
  submitLabel: PropTypes.string
};
RichEditorLinkInputForm.defaultProps = {
  linkLabel: 'Paste or type a link',
  onHide: () => {},
  onLink: () => {},
  applyLabel: 'Apply',
  cancelLabel: 'Cancel'
};
