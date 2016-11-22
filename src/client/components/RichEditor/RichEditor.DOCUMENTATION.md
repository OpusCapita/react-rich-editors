### Synopsis

**RichEditor** is a base rich editor component written using [draft-js framework](https://facebook.github.io/draft-js).

### Code Example

```
<div style={{ height: '300px' }}>
  <RichEditor
    autoFocus={true}
    placeholder="Enter some text..."
  />
</div>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| autoFocus | bool | Focus on `componentDidMount` |
| features | arrayOf(object) | Map of configurable features. For more details see `RichEditor/lib/default-features` |
| onChange | func | Callback fired on editor content change. `(text, editorState) => {}`. [EditorState definition](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html) |
| placeholder | string | Default text if editor content is empty |
| autoCompletionLinks | arrayOf(shape) | Links for auto completion. `[ { key: string, text: string, url: string }, ... ]` |

### Contributors
Kirill Volkovich

### Component Name

RichEditor

### License

Licensed by © 2016 OpusCapita

