let types = require('./feature-types');

module.exports = [
  {
    id: 'bold',
    label: 'Bold',
    style: 'BOLD',
    type: types.INLINE_STYLE,
    svg: require('!!raw!jcatalog-svg-icons/lib/format_bold.svg'),
    hotKeys: []
  },
  {
    id: 'italic',
    label: 'Italic',
    style: 'ITALIC',
    type: types.INLINE_STYLE,
    svg: require('!!raw!jcatalog-svg-icons/lib/format_italic.svg'),
    hotKeys: []
  },
  {
    id: 'underline',
    label: 'Underline',
    style: 'UNDERLINE',
    type: types.INLINE_STYLE,
    svg: require('!!raw!jcatalog-svg-icons/lib/format_underlined.svg'),
    hotKeys: []
  },
  {
    id: 'list',
    label: 'List',
    style: 'unordered-list-item',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!jcatalog-svg-icons/lib/list.svg'),
    hotKeys: []
  },
  {
    id: 'numeric-list',
    label: 'Numeric list',
    style: 'ordered-list-item',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!jcatalog-svg-icons/lib/format_list_numbered.svg'),
    hotKeys: []
  },
  {
    id: 'blockquote',
    label: 'Blockquote',
    style: 'blockquote',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!jcatalog-svg-icons/lib/format_quote.svg'),
    hotKeys: []
  },
  {
    id: 'insert-link',
    label: 'Link',
    style: 'unstyled',
    type: types.INSERT_LINK,
    svg: require('!!raw!jcatalog-svg-icons/lib/insert_link.svg'),
    hotKeys: []
  }
];
