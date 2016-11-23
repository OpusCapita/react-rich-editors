import React, { Component, PropTypes } from 'react';
import s from './RichEditorLinkInputForm.module.less';
import Button from 'jcatalog-react-ui-buttons/lib/Button';
import ShortcutContainer from '../ShortcutContainer';
import FakeInputAutocomplete from 'jcatalog-react-ui-autocompletes/lib/FakeInputAutocomplete';
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
    this._textInput.focus();
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

  handleAutoCompletionSelect(text) {
    let { autoCompletionLinks } = this.props;
    let url = autoCompletionLinks.find(autoCompletionLink => autoCompletionLink.text === text).url;
    this.setState({ text });
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
      autoCompletionLinks,
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

    let textsAutocomplete = autoCompletionLinks.map(
      autoCompletionLink => ({ key: autoCompletionLink.text, value: autoCompletionLink.text })
    );
    let maxSuggessionsHeight = 200;

    return (
      <ShortcutContainer keyMap={keyMap} handlers={handlers}>
        <div className={s.richEditorLinkInputForm}>
          <div className={s.form}>
            <div className={s.formInput}>
              <FakeInputAutocomplete
                ref={ref => (this._textInput = ref)}
                placeholder={t.textInputPlaceholder}
                onChange={event => this.handleInputChange.call(this, 'text', event)}
                onSelect={(event, text) => console.log('select', text) || this.handleAutoCompletionSelect.call(this, text)}
                items={textsAutocomplete}
                value={text}
                maxSuggessionsHeight={200}
              />
            </div>
            <div className={s.gap}></div>
            <div className={s.formInput}>
              <FakeInputAutocomplete
                placeholder={t.urlInputPlaceholder}
                onChange={event => this.handleInputChange.call(this, 'url', event)}
                value={url}
                onBlur={this.handleUrlInputBlur.bind(this)}
                onFocus={this.handleUrlInputFocus.bind(this)}
                maxSuggessionsHeight={200}
              />
            </div>
          </div>
          <div className={s.gap}></div>
          <div className={s.buttonsBlock}>
            <div className={s.applyButton}>
              <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)} type="button">
                {t.applyButton}
              </button>
            </div>
            <div className={s.gapSmall}></div>
            <div className={s.cancelButton}>
              <button className="btn btn-default" onClick={onHide} type="button">
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
  autoCompletionLinks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string
  })),
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
  autoCompletionLinks: [],
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
