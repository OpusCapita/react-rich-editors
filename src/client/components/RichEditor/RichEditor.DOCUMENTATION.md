### Synopsis

**RichEditor** is a base rich editor component written using [draft-js framework](https://facebook.github.io/draft-js).

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| autoFocus | bool | Focus on `componentDidMount` |
| features | arrayOf(object) | Map of configurable features. For more details see `RichEditor/lib/default-features` |
| onChange | func | Callback fired on editor content change. `(text, editorState) => {}`. [EditorState definition](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html) |
| placeholder | string | Default text if editor content is empty |
| autoCompletionLinks | arrayOf(shape) | Links for auto completion. `[ { text: string, url: string }, ... ]` `text` values **must** be unique |

### Code Example

```
<div style={{ height: '300px' }}>
  <RichEditor
    autoFocus={true}
    placeholder="Enter some text..."
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

RichEditor

### License

Licensed by © 2016 OpusCapita

