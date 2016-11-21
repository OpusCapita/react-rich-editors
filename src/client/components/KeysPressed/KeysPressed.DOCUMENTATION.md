### Synopsis

**KeysPressed** represents which keys are pressed right now.
For easy convert **key codes**, use this package: https://www.npmjs.com/package/keycode .

**Tips:**
* When you press any browser default hot-key (For example: <kbd>Ctrl/Cmd</kbd> + <kbd>F</kbd> (find on page)) and make mouse-click on search-field,
`keyup` event will not fired. In this situation you must run `flush()` method manually. It clears a list of current pressed keys. You must handle this behaviour on higher level components
* By default you can't focus non-focusable elements (`<div>`, `<span>`, `<ul>` etc). You can add `tabIndex={-1}` for these elements and for best look remove focus outline by adding `outline: none;` to their styles
* Children elements are focusable by design
* If you want to prepend default browser's hotkeys, use `event.preventDefault();` within `onKeyDown` callback

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| children | arrayOf(node) | Default behaviour |
| listenChildren | bool | Add event listeners on children. It's `true` by default |
| targets | arrayOf(object) | Event listeners will added to these DOM Nodes |
| onKeyDown | func | Callback fired on `keydown` event. **It is not fired if <kbd>key</kbd> already pressed!** <br /> **Arguments:** </br> * Array of keys codes (example: `[50, 52]` - <kbd>4</kbd> + <kbd>2</kbd>) <br /> * **event**: [SynteticEvent](https://facebook.github.io/react/docs/events.html) |
| onKeyUp | func | Callback fired on `keyup` event. <br /> **Arguments:** <br /> * An array of keys codes (Example: `[17, 18, 46]` - <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Del</kbd>) <br /> * **event**: [SynteticEvent](https://facebook.github.io/react/docs/events.html) |


### Code Example

```
<KeysPressed
  listenChildren={true}
  onKeyDown={_scope.handleKeyDown.bind(_scope)}
  onKeyUp={_scope.handleKeyUp.bind(_scope)}
  targets={[]}
>
  <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', border: '1px solid rgba(0, 0, 0, 0.05)', padding: '12px' }}>
    <h4>Click on any free space at window and press any keyboard keys to see result</h4>
    <h5>Ok. Nothing happens. It because now listening only this block</h5>
    <h4>Now click on me and press keys to see result</h4>
    <h5>Add `window` object to `targets` array to add whole `window` to listeners</h5>
  </div>
</KeysPressed>
```

### Contributors

Kirill Volkovich

### Component Name

KeysPressed

### License

Licensed by © 2016 OpusCapita

