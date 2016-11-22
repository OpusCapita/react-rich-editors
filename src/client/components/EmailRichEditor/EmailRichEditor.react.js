import React, { Component, PropTypes } from 'react';
import s from './EmailRichEditor.module.less';
import RichEditor from '../RichEditor';
import emailFeatures from './features';
import { EditorState, ContentState, CompositeDecorator, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import decorator from '../RichEditor/lib/decorator';

export default
class EmailRichEditor extends Component {
  handleChange(text, editorState) {
    let contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    if(this.props.onChange) {
      this.props.onChange(html, editorState);
    }
  }

  componentDidMount() {
    let nextDefaultHtml = this.props.defaultHtml;
    this.setDefaultHtml(nextDefaultHtml);
  }

  componentWillReceiveProps(nextProps) {
    let prevDefaultHtml = this.props.defaultHtml;
    let nextDefaultHtml = nextProps.defaultHtml;
    if(prevDefaultHtml !== nextDefaultHtml) {
      this.setDefaultHtml(nextDefaultHtml);
    }
  }

  setEditorState(editorState) {
    this._richEditor.setEditorState.call(this._richEditor, editorState);
  }

  setDefaultHtml(html) {
    const blocksFromHTML = convertFromHTML(html);
    console.log('b', blocksFromHTML)
    console.log('blocks', blocksFromHTML.contentBlocks)
    const nextContentState = ContentState.createFromBlockArray(blocksFromHTML);
    let nextEditorState = EditorState.createWithContent(nextContentState, decorator);
    this.setEditorState(nextEditorState);
  }

  hanldeRichEditorMount() {
    this.setHtml();
  }

  render() {
    let { features, ...restProps } = this.props;
    return (
      <div className={s.emailRichEditor}>
        <RichEditor
          { ...restProps }
          onChange={this.handleChange.bind(this)}
          features={[ ...emailFeatures, ...features ]}
          ref={ref => (this._richEditor = ref)}
        />
      </div>
    );
  }
}

EmailRichEditor.propTypes = {
  features: PropTypes.array,
  onChange: PropTypes.func,
  defaultHtml: PropTypes.string
};
EmailRichEditor.defaultProps = {
  features: [],
  defaultHtml: ''
};
