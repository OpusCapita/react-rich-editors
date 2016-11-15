import React, { Component, PropTypes } from 'react';
import s from './EmailRichEditor.module.less';
import './RichEditor.css'
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import HotKeyButton from 'jcatalog-react-ui-buttons/lib/HotKeyButton';

let boldIcon = require('!!raw-loader!jcatalog-svg-icons/lib/format_bold.svg');
let italicIcon = require('!!raw-loader!jcatalog-svg-icons/lib/format_italic.svg');
let underlineIcon = require('!!raw-loader!jcatalog-svg-icons/lib/format_underlined.svg');
let insertLinkIcon = require('!!raw-loader!jcatalog-svg-icons/lib/insert_link.svg');

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let svg;
    switch (this.props.label) {
      case 'Bold': (svg = boldIcon); break;
      case 'Italic': (svg = italicIcon); break;
      case 'Underline': (svg = underlineIcon); break;
    }

    let hotKeys = [];
    switch (this.props.label) {
      case 'Bold': (hotKeys = ['Ctrl + B']); break;
      case 'Italic': (hotKeys = ['Ctrl + I']); break;
      case 'Underline': (hotKeys = ['Ctrl + U']); break;
    }

    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <HotKeyButton svg={svg} svgSize="28px" style={{ padding: '0' }} color="#333" title={this.props.label} onMouseDown={this.onToggle.bind(this)} />
    );
  }
}

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Insert link', style: 'LINK'}
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton key={type.label} active={currentStyle.has(type.style)} label={type.label} onToggle={props.onToggle} style={type.style} />
      ))}
    </div>
);
};

export default
class EmailRichEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showURLInput: false,
      urlValue: ''
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      props.onHtml(stateToHTML(editorState.getCurrentContent()));
      this.setState({editorState});
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onTab = this.onTab.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);

    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({urlValue: e.target.value});
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
  }

  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    console.log('inlineStyle', inlineStyle)
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
    });
    }
  }

  _confirmLink(e) {
    e.preventDefault();
    const {editorState, urlValue} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
  });
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }

  render() {
    const { editorState } = this.state;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
    <div style={styles.urlInputContainer}>
    <input
      onChange={this.onURLChange}
      ref="url"
      style={styles.urlInput}
      type="text"
      value={this.state.urlValue}
      onKeyDown={this.onLinkInputKeyDown}
    />
    <button onMouseDown={this.confirmLink}>
      Confirm
      </button>
      </div>;
    }

    return (
      <div className="RichEditor-root">
        <div style={{ display: 'flex' }}>
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          <HotKeyButton svg={insertLinkIcon} svgSize="28px" style={{ padding: '0' }} color="#333" title="Insert Link" onMouseDown={this.promptForLink} />
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Email text..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

function findLinkEntities(contentState, contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
    const entityKey = character.getEntity();
  return (
    entityKey !== null &&
    contentState.getEntity(entityKey).getType() === 'LINK'
  );
},
  callback
);
}

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
  {props.children}
</a>
);
};
