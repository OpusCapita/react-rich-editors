export function getPlainTextOfSelection(editorState) {
  let selectionState = editorState.getSelection();
  let start = selectionState.getStartOffset();
  let end = selectionState.getEndOffset();
  let currentContent = editorState.getCurrentContent()
  let currentBlock = currentContent.getBlockForKey(selectionState.getStartKey())
  let selectedText = currentBlock.getText().slice(start, end);
  return selectedText;
}
