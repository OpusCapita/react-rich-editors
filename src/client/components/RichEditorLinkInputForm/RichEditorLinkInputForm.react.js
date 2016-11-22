import React, { Component, PropTypes } from 'react';
import s from './RichEditorLinkInputForm.module.less';
import Button from 'jcatalog-react-ui-buttons/lib/Button';
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

  setUrl(url) {
    this.setState({ url });
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
      defaultUrl,
      onHide,
      onSubmit
    } = this.props;
    let t = this.props.translations;

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
              placeholder={t.textInputPlaceholder}
              onChange={event => this.handleInputChange.call(this, 'text', event)}
              value={text}
            />
            <input
              className={s.input}
              placeholder={t.urlInputPlaceholder}
              onChange={event => this.handleInputChange.call(this, 'url', event)}
              value={url}
              onBlur={this.handleUrlInputBlur.bind(this)}
              onFocus={this.handleUrlInputFocus.bind(this)}
            />
          </div>
          <div className={s.buttonsBlock}>
            <div className={s.applyButton}>
              <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>
                {t.applyButton}
              </button>
          </div>
            <div className={s.cancelButton}>
              <button className="btn btn-default" onClick={onHide}>
                {t.cancelButton}
              </button>
            </div>
          </div>
        </div>
      </ShortcutContainer>
    );
  }
}

RichEditorLinkInputForm.propTypes = {
  translations: PropTypes.shape({
    applyButton: PropTypes.string,
    cancelButton: PropTypes.string,
    urlInputPlaceholder: PropTypes.string,
    textInputPlaceholder: PropTypes.string
  }),
  defaultUrl: PropTypes.string,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
  text: PropTypes.string,
  url: PropTypes.string
};
RichEditorLinkInputForm.defaultProps = {
  translations: {
    applyButton: 'Apply',
    cancelButton: 'Cancel',
    urlInputPlaceholder: 'Paste or type a link',
    textInputPlaceholder: 'Insert a text',
  },
  defaultUrl: 'http://',
  onHide: () => {},
  onSubmit: (text, link) => {},
  text: '',
  url: ''
};
