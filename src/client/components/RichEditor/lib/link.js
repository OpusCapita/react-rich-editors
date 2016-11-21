import { CompositeDecorator, Entity, RichUtils } from 'draft-js';
import { Map } from 'immutable';

export const Link = (props) => {
  console.log('props:', props);
  let {url} = Entity.get(props.entityKey).getData();
  return (
    <a href={url} style={{ color: '#303' }}>
      {props.children}
    </a>
  );
};

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    character => {
      let entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export function promptForLink(editorState) {
  let selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    let contentState = editorState.getCurrentContent();
    let startKey = editorState.getSelection().getStartKey();
    let startOffset = editorState.getSelection().getStartOffset();
    let blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    let linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    let url = '';
    if (linkKey) {
      let linkInstance = contentState.getEntity(linkKey);
      url = linkInstance.getData().url;
    }
    return url;
  }
}

export function confirmLink(editorState, selection, url) {
  let contentState = editorState.getCurrentContent();
  let entityKey = Entity.create('LINK', 'MUTABLE', { url });
  let nextEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
  return nextEditorState;
}

export function removeLink(editorState) {
  let selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    let nextEditorState = RichUtils.toggleLink(editorState, selection, null);
    return nextEditorState;
  }
  return editorState;
}
