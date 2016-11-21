import { CompositeDecorator } from 'draft-js';

export const Link = (props) => {
  let {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};

export function findLinkEntities(contentState, contentBlock, callback) {
  contentBlock.findEntityRanges(
    character => {
      let entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export const decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link,
}]);

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

export function confirmLink(editorState, url) {
  let contentState = editorState.getCurrentContent();
  let contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', url);
  let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  let nextEditorState = {
    editorState: RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ),
    showURLInput: false,
    urlValue: ''
  };
}

export function removeLink(editorState) {
  let selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    let nextEditorState = RichUtils.toggleLink(editorState, selection, null);
    return nextEditorState;
  }
  return editorState;
}
