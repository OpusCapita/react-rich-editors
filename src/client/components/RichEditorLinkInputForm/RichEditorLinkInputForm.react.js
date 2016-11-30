import React, { Component, PropTypes } from 'react';
import s from './RichEditorLinkInputForm.module.less';
import ShortcutContainer from '../ShortcutContainer';
import FakeInputAutocomplete from '@opuscapita/react-ui-autocompletes/lib/FakeInputAutocomplete';
import translations from './translations';
let getTranslation = (locale, message) => translations[locale][message];

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
    if (!url.length) {
      this.setState({ url: defaultUrl });
    }
  }

  handleUrlInputBlur() {
    let { defaultUrl } = this.props;
    let { url } = this.state;
    if (url === defaultUrl) {
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
      defaultUrl, // eslint-disable-line no-unused-vars
      locale,
      onHide,
      onSubmit, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    let getMessage = (message) => getTranslation(locale, message);

    let { text, url } = this.state;

    let keyMap = { hide: ['Escape'] }; // TODO
    let handlers = { hide: this.props.onHide } // TODO

    let textsAutocomplete = autoCompletionLinks.map(
      autoCompletionLink => ({ key: autoCompletionLink.text, value: autoCompletionLink.text })
    );
    let maxSuggessionsHeight = 192;
    let inputReactComponent = (props) => (<input { ...props } className="form-control" />);

    return (
      <ShortcutContainer
        keyMap={keyMap}
        handlers={handlers}
        className={s.richEditorLinkInputForm}
        { ...restProps }
      >
        <div className={s.form}>
          <h5 className={s.header}>{getMessage('header')}</h5>
          <div className={s.formInputGroup}>
            <label className={s.formLabel}>{getMessage('textLabel')}</label>
            <div className={s.formInput}>
              <FakeInputAutocomplete
                ref={ref => (this._textInput = ref)}
                placeholder={getMessage('textPlaceholder')}
                onChange={event => this.handleInputChange.call(this, 'text', event)}
                onSelect={(event, text) => this.handleAutoCompletionSelect.call(this, text)}
                inputReactComponent={inputReactComponent}
                items={textsAutocomplete}
                value={text}
                maxSuggessionsHeight={maxSuggessionsHeight}
              />
            </div>
          </div>
          <div className={s.formInputGroup}>
            <label className={s.formLabel}>{getMessage('linkLabel')}</label>
            <div className={s.formInput}>
              <FakeInputAutocomplete
                placeholder={getMessage('linkPlaceholder')}
                onChange={event => this.handleInputChange.call(this, 'url', event)}
                value={url}
                inputReactComponent={inputReactComponent}
                onBlur={this.handleUrlInputBlur.bind(this)}
                onFocus={this.handleUrlInputFocus.bind(this)}
                maxSuggessionsHeight={maxSuggessionsHeight}
              />
            </div>
          </div>
        </div>
        <div className={s.buttonsBlock}>
          <div className={s.applyButton}>
            <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)} type="button">
              {getMessage('applyButton')}
            </button>
          </div>
          <div className={s.cancelButton}>
            <button className="btn btn-default" onClick={onHide} type="button">
              {getMessage('cancelButton')}
            </button>
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
  defaultUrl: PropTypes.string,
  onHide: PropTypes.func,
  onSubmit: PropTypes.func,
  locale: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string
};
RichEditorLinkInputForm.defaultProps = {
  autoCompletionLinks: [],
  locale: 'en',
  defaultUrl: 'http://',
  onHide: () => {},
  onSubmit: (text, link) => {},
  text: '',
  url: ''
};
