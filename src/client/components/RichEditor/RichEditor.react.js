import React, { Component, PropTypes } from 'react';
import s from './RichEditor.module.less';
import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';
import { confirmLink, removeLink, getLinkUrl } from './lib/link';
import { getPlainTextOfSelection } from './lib/selection';
import RichEditorToolbar from '../RichEditorToolbar';
import RichEditorLinkInputForm from '../RichEditorLinkInputForm';
import SimpleModal from '@opuscapita/react-ui-overlays/lib/SimpleModal';
import defaultFeatures from './lib/default-features';
import featureTypes from './lib/feature-types';
import decorator from './lib/decorator';

export default
class RichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      isShowLinkInputForm: false
    };
  }

  componentDidMount() {
    this.handleAutoFocusProperty();
  }

  componentWillUnmount() {
    if (this._linkInputFocusTimeout) {
      clearTimeout(this._linkInputFocusTimeout);
    }
  }

  handleAutoFocusProperty() {
    return this.props.autoFocus && this.focus();
  }

  focus() {
    return this._editor.focus();
  }

  getCurrentSelection() {
    return this.state.editorState.getSelection();
  }

  setEditorState(editorState) {
    this.setState({ editorState });
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
    let { editorState } = this.state;
    let nextIsShowLinkInputForm = (typeof show !== 'undefined') ? show : !this.state.isShowLinkInputForm;
    this.setState({ isShowLinkInputForm: nextIsShowLinkInputForm });
    let selectionState = editorState.getSelection();
    let text = getPlainTextOfSelection(editorState, selectionState);
    let url = getLinkUrl(editorState, selectionState) || '';
    if (nextIsShowLinkInputForm) {
      this._linkInputForm.clearValues();
      this._linkInputForm.setText(text);
      this._linkInputForm.setUrl(url);
      this._linkInputFocusTimeout = setTimeout(() => this._linkInputForm.focus(), 280);
    }
  }

  onChange(editorState) {
    let plainText = editorState.getCurrentContent().getPlainText();
    if (this.props.onChange) {
      this.props.onChange(plainText, editorState);
    }
    return this.setState({ editorState });
  }

  getFeatureHandler(feature) {
    switch (feature.type) {
      case featureTypes.BLOCK_TYPE: return this.toggleBlockType(feature.style);
      case featureTypes.INLINE_STYLE: return this.toggleInlineStyle(feature.style);
      case featureTypes.INSERT_LINK: return this.toggleShowLinkInputForm();
      default: return (() => {});
    }
  }

  isFeatureIsActive(feature) {
    switch (feature.type) {
      case featureTypes.BLOCK_TYPE: return (this.getCurrentBlockType() === feature.style);
      case featureTypes.INLINE_STYLE: return this.getCurrentInlineStyle().has(feature.style);
      case featureTypes.INSERT_LINK: return this.state.isShowLinkInputForm;
      default: return false;
    }
  }

  getActiveFeatures(features) {
    return features.reduce((result, feature) =>
      this.isFeatureIsActive(feature) ? [...result, feature.id] : result,
      []
    );
  }

  getCurrentBlockType() {
    let { editorState } = this.state;
    let selection = editorState.getSelection();
    return editorState.
      getCurrentContent().
      getBlockForKey(selection.getStartKey()).
      getType();
  }

  getCurrentInlineStyle() {
    let editorState = this.state.editorState;
    return editorState.getCurrentInlineStyle();
  }

  handleLinkChange(selection, text, url) {
    let { editorState } = this.state;
    if (!url) {
      let nextEditorState = removeLink(editorState, selection);
      return this.setState({ editorState: nextEditorState });
    }
    let prevEditorState = this.state.editorState;
    let nextEditorState = confirmLink(prevEditorState, selection, text, url);
    return this.onChange(nextEditorState);
  }

  render() {
    let { features, placeholder, autoCompletionLinks } = this.props;
    let { editorState, isShowLinkInputForm } = this.state;

    let activeFeatures = this.getActiveFeatures(features);

    let linkInputForm = (
      <SimpleModal
        isShow={ isShowLinkInputForm }
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className={s.linkInputForm}>
          <RichEditorLinkInputForm
            ref={ref => (this._linkInputForm = ref)}
            onHide={() => this.toggleShowLinkInputForm.call(this, false)}
            onSubmit={(text, url) => this.handleLinkChange.call(this, editorState.getSelection(), text, url)}
            autoCompletionLinks={autoCompletionLinks}
          />
        </div>
      </SimpleModal>
    );

    return (
      <div className={`${s.richEditor} form-control`} style={{ padding: '0', boxShadow: 'none' }}>
        <div className={s.toolbar}>
          <RichEditorToolbar
            activeFeatures={activeFeatures}
            features={features}
            onGetFeatureHandler={this.getFeatureHandler.bind(this)}
            editorState={editorState}
            isPromptOpened={false}
          />
        </div>
        <div className={s.textArea} onClick={this.focus.bind(this)}>
          <Editor
            ref={ref => (this._editor = ref)}
            editorState={editorState}
            onChange={this.onChange.bind(this)}
            placeholder={placeholder}
          />
        </div>
        {linkInputForm}
      </div>
    );
  }
}

RichEditor.propTypes = {
  autoFocus: PropTypes.bool,
  features: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoCompletionLinks: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string
  }))
};
RichEditor.defaultProps = {
  features: defaultFeatures,
  autoCompletionLinks: []
};
