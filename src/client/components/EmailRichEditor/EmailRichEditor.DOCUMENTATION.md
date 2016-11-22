### Synopsis

EmailRichEditor is a wrapper around **RichEditor** component, preconfigured for edit emails.

### Code Example

```
<div style={{ height: '300px' }}>
  <EmailRichEditor
    placeholder="Enter email body..."
    onChange={_scope.handleHtml.bind(_scope)}
    defaultHtml="<div>Html <a href='http://google.com'>Link</a></div>"
  />
</div>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| defaultHtml | string | Default HTML value. |
| onChange | func | Callback fired on editor content change. `(stringifiedHtml, editorState) => {}` |

It can take any other props of **RichEditor** component.

### Contributors
Kirill Volkovich

### Component Name

EmailRichEditor

### License

Licensed by © 2016 OpusCapita

