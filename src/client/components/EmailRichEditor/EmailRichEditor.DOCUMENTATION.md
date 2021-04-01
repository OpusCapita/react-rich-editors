### Synopsis

**EmailRichEditor** is a wrapper around **RichEditor** component, preconfigured for edit emails.

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                                         |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                                         |
| value                          | string                  | Default HTML value.                                                                                                                                                                 |
| onChange                       | func                    | Callback fired on editor content change. `(stringifiedHtml, editorState) => {}`. [EditorState defenition](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html) |

It can take any other props of **RichEditor** component.

### Code Example

```
<div style={{ height: '320px' }}>
  <EmailRichEditor
    locale={_scope.state.locale}
    fallbackLocale='en'
    onChange={_scope.handleHtml.bind(_scope)}
    value={`<p><strong>Bold</strong> <em>Italic</em> <ins><em>Underlined&nbsp;</em></ins></p> <blockquote><em><strong>Quote</strong></em></blockquote> <p><br></p> <ul> <li><em><strong>Unordered list item</strong></em></li> <li><em>Unordered list item</em></li> </ul> <p><br></p> <ol> <li><strong>Ordered list item</strong></li> <li><em>Ordered list item</em></li> </ol> <p><a href="http://google.com/"><strong>google.com (link)</strong></a></p>`}
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

EmailRichEditor

### License

Licensed by © 2016 OpusCapita

