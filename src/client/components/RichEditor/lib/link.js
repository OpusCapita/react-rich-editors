import { CompositeDecorator, Entity, RichUtils } from 'draft-js';
import { Map } from 'immutable';

export const Link = (props) => {
  let { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} title={url} style={{ textDecoration: 'underiline' }}>
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
