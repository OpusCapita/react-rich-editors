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
      url: props.url,
      text: props.text
    };
  }

  focus() {
    this._input.focus();
  }

  clearValues() {
    this.setState({ text: '', url: '' });
  }

  setText(text) {
    this.setState({ text });
  }

  handleInputChange(name, event) {
    let nextValue = event.target.value;
    this.setState({ [name]: nextValue });
  }

  handleUrlInputFocus() {
    let { defaultUrl } = this.props;
    let { url } = this.state;
    if(!url.length) {
      this.setState({ url: defaultUrl });
    }
  }

  handleUrlInputBlur() {
    let { defaultUrl } = this.props;
    let { url } = this.state;
    if(url === defaultUrl) {
      this.setState({ url: '' });
    }
  }

  handleSubmit() {
    let { onSubmit, onHide } = this.props;
    let { text, url } = this.state;
    onSubmit(text, url);
    onHide();
  }

  render() {
    let {
      applyLabel,
      cancelLabel,
      defaultUrl,
      linkLabel,
      textLabel,
      onHide,
      onSubmit
    } = this.props;

    let {
      isUrlInputFocused,
      text,
      url
    } = this.state;

    let keyMap = { hide: ['Escape'] }; // TODO
    let handlers = { hide: this.props.onHide } // TODO

    return (
      <ShortcutContainer keyMap={keyMap} handlers={handlers}>
        <div className={s.richEditorLinkInputForm}>
          <div className={s.form}>
            <input
              ref={ref => (this._input = ref)}
              className={s.input}
              placeholder={textLabel}
              onChange={event => this.handleInputChange.call(this, 'text', event)}
              value={text}
            />
            <input
              className={s.input}
              placeholder={linkLabel}
              onChange={event => this.handleInputChange.call(this, 'url', event)}
              value={url}
              onBlur={this.handleUrlInputBlur.bind(this)}
              onFocus={this.handleUrlInputFocus.bind(this)}
            />
          </div>
          <div className={s.buttonsBlock}>
            <div className={s.applyButton}>
              <HotKeyButton
                label={applyLabel}
                bgColor="#66bb6a"
                color="#fff"
                paper={true}
                onClick={this.handleSubmit.bind(this)}
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
  applyLabel: PropTypes.string,
  defaultUrl: PropTypes.string,
  linkLabel: PropTypes.string,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  text: PropTypes.string,
  textLabel: PropTypes.string,
  url: PropTypes.string,
};
RichEditorLinkInputForm.defaultProps = {
  applyLabel: 'Apply',
  cancelLabel: 'Cancel',
  defaultUrl: 'http://',
  linkLabel: 'Paste or type a link',
  onHide: () => {},
  onSubmit: (text, link) => {},
  text: '',
  textLabel: 'Insert a text',
  url: ''
};
