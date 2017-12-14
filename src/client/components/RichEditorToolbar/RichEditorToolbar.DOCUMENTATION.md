### Synopsis

RichEditorToolbar

### Code Example

```
<RichEditorToolbar 
  features={[
    { name: 'Bold', svg: _scope.getIcon('format_bold') },
    { name: 'Italic', svg: _scope.getIcon('format_italic') },
    { name: 'Underlined', svg: _scope.getIcon('format_underlined') }
  ]}
  onGetFeatureHandler={() => console.log(`click`)}
/>
```

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| featuresTranslations | object | Example: `{ en: { bold: 'Bold', italic: 'Italic' }, de: { bold: 'Fett', italic: 'Kursiv' } }` |
| locale | string | en/de/etc. |

### Contributors
Kirill Volkovich

### Component Name

RichEditorToolbar

### License

Licensed by © 2016 OpusCapita

