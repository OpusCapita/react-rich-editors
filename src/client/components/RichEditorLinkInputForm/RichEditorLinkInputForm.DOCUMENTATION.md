### Synopsis

RichEditorLinkInputForm

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| locale | string | en/de/etc. |
| translations | shape | Tranlsations map. See 	appropriate section |
| autoCompletionLinks | arrayOf(shape) | Links for auto completion. `[ { text: string, url: string }, ... ]` `text` values **must** be unique |

#### Translations
* applyButton
* cancelButton
* urlInputPlaceholder
* textInputPlaceholder

### Code Example

```
<RichEditorLinkInputForm 
  
/>
```

### Contributors

Kirill Volkovich

### Component Name

RichEditorLinkInputForm

### License

Licensed by © 2016 OpusCapita

