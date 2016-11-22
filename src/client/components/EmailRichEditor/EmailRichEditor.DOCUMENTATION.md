### Synopsis

**EmailRichEditor** is a wrapper around **RichEditor** component, preconfigured for edit emails.

### Code Example

```
<div style={{ height: '320px' }}>
  <EmailRichEditor
    placeholder="Enter email body..."
    onChange={_scope.handleHtml.bind(_scope)}
    defaultHtml={`<p><strong>Bold</strong> <em>Italic</em> <ins><em>Underlined&nbsp;</em></ins></p> <blockquote><em><strong>Quote</strong></em></blockquote> <p><br></p> <ul> <li><em><strong>Unordered list item</strong></em></li> <li><em>Unordered list item</em></li> </ul> <p><br></p> <ol> <li><strong>Ordered list item</strong></li> <li><em>Ordered list item</em></li> </ol> <p><a href="http://google.com/"><strong>g</strong></a><a href="http://google.com/"><strong>oogle.com (link)</strong></a></p>`}
  />
</div>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| defaultHtml | string | Default HTML value. |
| onChange | func | Callback fired on editor content change. `(stringifiedHtml, editorState) => {}`. [EditorState defenition](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html)|

It can take any other props of **RichEditor** component.

### Contributors
Kirill Volkovich

### Component Name

EmailRichEditor

### License

Licensed by © 2016 OpusCapita

