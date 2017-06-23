import React, { Component, PropTypes } from 'react';
import s from './MarkdownRichEditor.module.less';
import RichEditor from '../RichEditor';
import markdownFeatures from './features';
import { stateToMarkdown, Options as ImportOptions } from 'draft-js-export-markdown';
import { stateFromMarkdown, Options as ExportOptions } from 'draft-js-import-markdown';
import { TypeaheadEditor } from 'draft-js-typeahead';
import { convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js';
import decorator from '../RichEditor/lib/decorator';
import translations from './translations';
let getTranslation = (locale, message) => translations[locale][message];

export default
class MarkdownRichEditor extends Component {
  componentDidMount() {
    let nextDefaultMarkdown = this.props.value;
    this.setDefaultMarkdown(nextDefaultMarkdown);
  }

  componentDidUpdate() {
    this.formatMarkdownContent();
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

  formatMarkdownContent() {
    if (this._richEditor) {
      let editorState = this._richEditor.state.editorState;
      let contentState = editorState.getCurrentContent();
      let blocks = contentState.getBlocksAsArray();

      //check if unformatted markdown is inserted
      let hasUnformattedMarkdown = false;
      //TODO add other RegExps to check unformatted markdown
      let searchPattern = new RegExp('^(\\s)*#\\s+', 'm');
      blocks.forEach((block) => {
        let blockText = block.getText();
        let blockType = block.getType();
        if (blockType == 'unstyled' && searchPattern.test(blockText)) {
          hasUnformattedMarkdown = true
        }
      });

      if (hasUnformattedMarkdown) {
        //convert to markdown
        const markdown = stateToMarkdown(contentState);
        //convert back to content state
        const nextContentState = stateFromMarkdown(markdown);

        //get current block index
        let selectionState = editorState.getSelection();
        let anchorKey = selectionState.getAnchorKey();
        const currentBlockKey = editorState.getSelection().getStartKey();
        const currentBlockIndex = editorState.getCurrentContent().getBlockMap()
          .keySeq().findIndex(k => k === currentBlockKey);

        //create new editor state
        let nextEditorState = EditorState.createWithContent(nextContentState, decorator);

        //get target block for selection
        let targetBlockKey = nextEditorState.getCurrentContent().getBlockMap()
          .keySeq().get(currentBlockIndex);
        if (targetBlockKey === undefined) {
          targetBlockKey = nextEditorState.getCurrentContent().getBlockMap().keySeq().last()
        }
        var targetContentBlock = nextEditorState.getCurrentContent().getBlockForKey(targetBlockKey);

        //add selection
        let newSelectionState = new SelectionState({
          anchorKey: targetBlockKey,
          anchorOffset: targetContentBlock.getLength(),
        });
        nextEditorState = EditorState.forceSelection(nextEditorState, newSelectionState);

        this.setEditorState(nextEditorState);
      }
    }
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
