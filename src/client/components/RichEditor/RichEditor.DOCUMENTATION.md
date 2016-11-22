### Synopsis

**RichEditor** is a base rich editor component written using [draf-js framework](https://facebook.github.io/draft-js).

### Code Example

```
<RichEditor
  autoFocus={true}
  placeholder="Enter some text..."
/>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| placeholder | string | Default text if editor content is empty |
| autoFocus | bool | Focus on `componentDidMount` |
| features | arrayOf(object) | Map of configurable features. For more details see `RichEditor/lib/default-features` |
| onChange | func | Callback fired on editor content change. `(text, editorState) => {}` |

### Contributors
Kirill Volkovich

### Component Name

RichEditor

### License

Licensed by © 2016 OpusCapita

