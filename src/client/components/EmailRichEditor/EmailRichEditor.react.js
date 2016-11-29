import React, { Component, PropTypes } from 'react';
import s from './EmailRichEditor.module.less';
import RichEditor from '../RichEditor';
import emailFeatures from './features';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import decorator from '../RichEditor/lib/decorator';
import translations from './translations';
let getTranslation = (locale, message) => translations[locale][message];

export default
class EmailRichEditor extends Component {
  componentDidMount() {
    let nextDefaultHtml = this.props.value;
    this.setDefaultHtml(nextDefaultHtml);
  }

  componentWillReceiveProps(nextProps) {
    let prevDefaultHtml = this.props.value;
    let nextDefaultHtml = nextProps.value;
    if (prevDefaultHtml !== nextDefaultHtml) {
      this.setDefaultHtml(nextDefaultHtml);
    }
  }

  handleChange(text, editorState) {
    let contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    if (this.props.onChange) {
      this.props.onChange(html, editorState);
    }
  }

  setEditorState(editorState) {
    this._richEditor.setEditorState.call(this._richEditor, editorState);
  }

  setDefaultHtml(html) {
    const blocksFromHTML = convertFromHTML(html);
    const nextContentState = ContentState.createFromBlockArray(blocksFromHTML);
    let nextEditorState = EditorState.createWithContent(nextContentState, decorator);
    this.setEditorState(nextEditorState);
  }

  hanldeRichEditorMount() {
    this.setHtml();
  }

  render() {
    let { features, placeholder, ...restProps } = this.props;
    let getMessage = (message) => getTranslation(this.props.locale, message);

    return (
      <div className={s.emailRichEditor}>
        <RichEditor
          { ...restProps }
          onChange={this.handleChange.bind(this)}
          features={[...emailFeatures, ...features]}
          ref={ref => (this._richEditor = ref)}
          placeholder={typeof placeholder === 'undefined' ? getMessage('placeholder') : placeholder}
        />
      </div>
    );
  }
}

EmailRichEditor.propTypes = {
  features: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  locale: PropTypes.string,
  placeholder: PropTypes.string
};
EmailRichEditor.defaultProps = {
  features: [],
  value: '',
  locale: 'en'
};
