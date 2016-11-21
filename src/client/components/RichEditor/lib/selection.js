export function getPlainTextOfSelection(editorState, selectionState) {
  let start = selectionState.getStartOffset();
  let end = selectionState.getEndOffset();
  let currentContent = editorState.getCurrentContent()
  let currentBlock = currentContent.getBlockForKey(selectionState.getStartKey())
  let selectedText = currentBlock.getText().slice(start, end);
  return selectedText;
}

export function replaceTextOfSelection(editorState, selectionState) {
  let start = selectionState.getStartOffset();
  let end = selectionState.getEndOffset();
  let currentContent = editorState.getCurrentContent()
  let currentBlock = currentContent.getBlockForKey(selectionState.getStartKey())
  let selectedText = currentBlock.getText().slice(start, end);
  return selectedText;
}
