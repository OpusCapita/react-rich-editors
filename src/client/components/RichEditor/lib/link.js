import { Entity, RichUtils } from 'draft-js';
import { replaceTextOfSelection } from './selection';

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

export function getLinkUrl(editorState, selection) {
  if (!selection.isCollapsed()) {
    let contentState = editorState.getCurrentContent();
    let startKey = selection.getStartKey();
    let startOffset = selection.getStartOffset();
    let blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    let linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    let url = '';
    if (linkKey) {
      let linkInstance = Entity.get(linkKey);
      url = linkInstance.getData().url;
    }
    return url;
  }
  return null;
}

export function confirmLink(editorState, selection, nextText, url) {
   // eslint-disable-next-line
  let contentState = editorState.getCurrentContent();
  let entityKey = Entity.create('LINK', 'MUTABLE', { url });
  let nextEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
  nextEditorState = replaceTextOfSelection(nextEditorState, selection, nextText, null, entityKey);
  return nextEditorState;
}

export function removeLink(editorState, selection) {
  if (!selection.isCollapsed()) {
    let nextEditorState = RichUtils.toggleLink(editorState, selection, null);
    return nextEditorState;
  }
  return editorState;
}
