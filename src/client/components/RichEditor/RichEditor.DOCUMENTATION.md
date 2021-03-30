### Synopsis

**RichEditor** is a base rich editor component written using [draft-js framework](https://facebook.github.io/draft-js).

### Props Reference

| Name                           | Type                    | Description                                                                                                                                                              |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                                                              |
| autoFocus                      | bool                    | Focus on `componentDidMount`                                                                                                                                             |
| features                       | arrayOf(object)         | Map of configurable features. For more details see `RichEditor/lib/default-features`                                                                                     |
| featuresTranslations           | object                  | Example: `{ en: { bold: 'Bold', italic: 'Italic' }, de: { bold: 'Fett', italic: 'Kursiv' } }`                                                                            |
| onChange                       | func                    | Callback fired on editor content change. `(text, editorState) => {}`. [EditorState definition](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html) |
| locale                         | string                  | en/de/etc.                                                                                                                                                               |
| fallbackLocale                 | string                  | en/de/etc.                                                                                                                                                               |
| placeholder                    | string                  | Default text if editor content is empty                                                                                                                                  |
| autoCompletionLinks            | arrayOf(shape)          | Links for auto completion. `[ { text: string, url: string }, ... ]` `text` values **must** be unique                                                                     |

### Code Example

```
<div style={{ height: '300px' }}>
  <RichEditor
    autoFocus={true}
    autoCompletionLinks={[
      { text: 'TEST-1', url: 'http://test1.example.com' },
      { text: 'TEST-2', url: 'http://test2.example.com' },
      { text: 'TEST-3', url: 'http://test3.example.com' },
      { text: 'TEST-4', url: 'http://test4.example.com' },
      
      { text: 'PROD-1', url: 'http://prod1.example.com' },
      { text: 'PROD-2', url: 'http://prod2.example.com' },
      { text: 'PROD-3', url: 'http://prod3.example.com' },
      { text: 'PROD-4', url: 'http://prod4.example.com' }
    ]}
    locale={_scope.state.locale}
    fallbackLocale='en'
  />
</div>
```

### Contributors
Kirill Volkovich

### Component Name

RichEditor

### License

Licensed by © 2016 OpusCapita

