let types = require('../RichEditor/lib/feature-types');

module.exports = [
  {
    id: 'bold',
    label: 'Bold',
    style: 'BOLD',
    type: types.INLINE_STYLE,
    svg: require('!!raw!@opuscapita/svg-icons/lib/format_bold.svg'),
    hotKeys: []
  },
  {
    id: 'italic',
    label: 'Italic',
    style: 'ITALIC',
    type: types.INLINE_STYLE,
    svg: require('!!raw!@opuscapita/svg-icons/lib/format_italic.svg'),
    hotKeys: []
  },
  {
    id: 'header-1',
    label: 'Header 1',
    style: 'header-one',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!@opuscapita/svg-icons/lib/filter_1.svg'), //TODO change the icon later on, add translations
    hotKeys: []
  },
  {
    id: 'list',
    label: 'List',
    style: 'unordered-list-item',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!@opuscapita/svg-icons/lib/list.svg'),
    hotKeys: []
  },
  {
    id: 'numeric-list',
    label: 'Numeric List',
    style: 'ordered-list-item',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!@opuscapita/svg-icons/lib/format_list_numbered.svg'),
    hotKeys: []
  },
  {
    id: 'blockquote',
    label: 'Blockquote',
    style: 'blockquote',
    type: types.BLOCK_TYPE,
    svg: require('!!raw!@opuscapita/svg-icons/lib/format_quote.svg'),
    hotKeys: []
  },
  {
    id: 'insert-link',
    label: 'Insert link',
    style: 'unstyled',
    type: types.INSERT_LINK,
    svg: require('!!raw!@opuscapita/svg-icons/lib/insert_link.svg'),
    hotKeys: []
  }
];
