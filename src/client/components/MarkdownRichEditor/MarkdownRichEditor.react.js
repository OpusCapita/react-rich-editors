import React, { Component, PropTypes } from 'react';
import s from './MarkdownRichEditor.module.less';
import RichEditor from '../RichEditor';
import markdownFeatures from './features';
import { stateToMarkdown, Options as ImportOptions } from 'draft-js-export-markdown';
import { stateFromMarkdown, Options as ExportOptions } from 'draft-js-import-markdown';
import { TypeaheadEditor } from 'draft-js-typeahead';
import { EditorState, ContentState, convertFromRaw, convertToRaw } from 'draft-js';
import decorator from '../RichEditor/lib/decorator';
import translations from './translations';
let getTranslation = (locale, message) => translations[locale][message];

export default
class MarkdownRichEditor extends Component {
  componentDidMount() {
    let nextDefaultMarkdown = this.props.value;
    this.setDefaultMarkdown(nextDefaultMarkdown);
  }

  componentWillReceiveProps(nextProps) {
    let prevDefaultMarkdown = this.props.value;
    let nextDefaultMarkdown = nextProps.value;
    if (prevDefaultMarkdown !== nextDefaultMarkdown) {
      this.setDefaultMarkdown(nextDefaultMarkdown);
    }
  }

  handleChange(text, editorState) {
    let contentState = editorState.getCurrentContent();
    let markdown = this.getMarkdown(editorState);
    if (this.props.onChange) {
      this.props.onChange(markdown, editorState);
    }
  }

  getMarkdown(editorState) {
    const content = editorState.getCurrentContent();
    return stateToMarkdown(content);
  }

  setEditorState(editorState) {
    this._richEditor.setEditorState.call(this._richEditor, editorState);
  }

  setDefaultMarkdown(markdown) {
    const contentState = stateFromMarkdown(markdown);
    const nextEditorState = EditorState.createWithContent(contentState, decorator);
    this.setEditorState(nextEditorState);
  }

  handleRichEditorMount() {
    console.log('mount', this);
    this.setMarkdown();
  }

  render() {
    let { features, placeholder, ...restProps } = this.props;
    let getMessage = (message) => getTranslation(this.props.locale, message);

    return (
      <div className={s.markdownRichEditor}>
        <RichEditor
          { ...restProps }
          onChange={this.handleChange.bind(this)}
          features={[...markdownFeatures, ...features]}
          ref={ref => (this._richEditor = ref)}
          placeholder={typeof placeholder === 'undefined' ? getMessage('placeholder') : placeholder}
        />
      </div>
    );
  }
}

MarkdownRichEditor.propTypes = {
  features: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  locale: PropTypes.string,
  placeholder: PropTypes.string
};
MarkdownRichEditor.defaultProps = {
  features: [],
  value: '',
  locale: 'en'
};
