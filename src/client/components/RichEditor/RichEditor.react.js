import React, { Component, PropTypes } from 'react';
import s from './RichEditor.module.less';
import {
  CompositeDecorator,
  Editor,
  EditorState,
  Modifier,
  RichUtils
} from 'draft-js';
import { decorator } from './link-decorator';
import RichEditorToolbar from '../RichEditorToolbar';
import RichEditorLinkInputForm from '../RichEditorLinkInputForm';
import defaultFeatures from './default-features';
import featureTypes from './feature-types';
import { Motion, spring } from 'react-motion';

export default
class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isShowLinkInputForm: false,
      urlValue: ''
    };
  }

  componentDidMount() {
    this.handleAutoFocusProperty();
  }

  handleAutoFocusProperty() {
    this.props.autoFocus && this.focus();
  }

  focus() {
    this._editor.focus();
  }

  getCurrentSelection() {
    return this.state.editorState.getSelection();
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  toggleShowLinkInputForm(show) {
    let nextIsShowLinkInputForm = (typeof show !== 'undefined') ? show : !this.state.isShowLinkInputForm;
    this.setState({ isShowLinkInputForm: nextIsShowLinkInputForm });
    if(nextIsShowLinkInputForm) {
      this._linkInputForm.clearUrlValue();
      this._linkInputForm.focus();
    }
  }

  onChange(editorState) {
    this.props.onChange && this.props.onChange(editorState.getCurrentContent(), editorState);
    this.setState({ editorState });
  }

  getFeatureHandler(feature) {
    switch(feature.type) {
      case featureTypes.BLOCK_TYPE: return this.toggleBlockType(feature.style);
      case featureTypes.INLINE_STYLE: return this.toggleInlineStyle(feature.style);
      case featureTypes.INSERT_LINK: return this.toggleShowLinkInputForm(feature.style);
      default: return (() => {});
    }
  }

  isFeatureIsActive(feature) {
    switch(feature.type) {
      case featureTypes.BLOCK_TYPE: return (this.getCurrentBlockType() === feature.style); break;
      case featureTypes.INLINE_STYLE: return this.getCurrentInlineStyle().has(feature.style); break;
      case featureTypes.INSERT_LINK: return this.state.isShowLinkInputForm; break;
      default: return false;
    }
  }

  getActiveFeatures(features) {
    return features.reduce((result, feature) =>
      this.isFeatureIsActive(feature) ? [ ...result, feature.id ] : result,
      []
    );
  }

  getCurrentBlockType() {
    let editorState = this.state.editorState;
    let selection = editorState.getSelection();
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  }

  getCurrentInlineStyle() {
    let editorState = this.state.editorState;
    return editorState.getCurrentInlineStyle();
  }

  render() {
    let { features, placeholder } = this.props;
    let { editorState, isShowLinkInputForm } = this.state;

    let activeFeatures = this.getActiveFeatures(features);

    let linkInputForm = (
      <Motion
        defaultStyle={{ x: -100 }}
        style={{ x: isShowLinkInputForm ? spring(0) : spring(-100) }}
      >{interpolatedStyle =>
        <div className={s.toolbarPrompt} style={{ transform: `translate(${interpolatedStyle.x}%, 0)` }}>
          <RichEditorLinkInputForm
            ref={ref => (this._linkInputForm = ref)}
            onHide={() => this.toggleShowLinkInputForm.call(this, false)}
          />
        </div>}
      </Motion>
    )

    return (
      <div className={s.richEditor}>
        <div className={s.toolbar}>
          <RichEditorToolbar
            activeFeatures={activeFeatures}
            features={features}
            onGetFeatureHandler={this.getFeatureHandler.bind(this)}
            editorState={editorState}
            isPromptOpened={false}
          />
          {linkInputForm}
        </div>
        <div className={s.textArea} onClick={this.focus.bind(this)}>
          <Editor
            ref={ref => (this._editor = ref)}
            editorState={editorState}
            onChange={this.onChange.bind(this)}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
}

// const decorator = new CompositeDecorator([LinkDecorator]);
//
// function createValueFromString(markup: string, format: string, options?: ImportOptions): EditorValue {
//   return EditorValue.createFromString(markup, format, decorator, options);
// }

RichEditor.propTypes = {
  autoFocus: PropTypes.bool,
  features: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};
RichEditor.defaultProps = {
  features: defaultFeatures
};
