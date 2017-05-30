### Synopsis

**MarkdownRichEditor** is a wrapper around **RichEditor** component, preconfigured for edit emails.

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                                         |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                                         |
| value                          | string                  | Default HTML value.                                                                                                                                                                 |
| onChange                       | func                    | Callback fired on editor content change. `(stringifiedHtml, editorState) => {}`. [EditorState defenition](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html) |

It can take any other props of **RichEditor** component.

### Code Example

```
<div style={{ height: '320px' }}>
  <MarkdownRichEditor
    locale={_scope.state.locale}
    onChange={_scope.handleMarkdown.bind(_scope)}
    value={`
# Header 1
## Header 2
### Header 3

* Hello
* World
* How are you
    `}
    autoCompletionLinks={[
      { text: 'PIM installation', url: 'http://pim.opuscapita.com' },
      { text: 'PROV installation', url: 'http://prov.opuscapita.com' },
      { text: 'DAM installation', url: 'http://dam.opuscapita.com' },
      { text: 'SIM installation', url: 'http://sim.opuscapita.com' },
      
      { text: 'PIM TEST installation', url: 'http://test.pim.opuscapita.com' },
      { text: 'PROV TEST installation', url: 'http://test.prov.opuscapita.com' },
      { text: 'DAM TEST installation', url: 'http://test.dam.opuscapita.com' },
      { text: 'SIM TEST installation', url: 'http://test.sim.opuscapita.com' }
    ]}
  />
</div>
```

### Contributors
Kirill Volkovich

### Component Name

MarkdownRichEditor

### License

Licensed by © 2016 OpusCapita
