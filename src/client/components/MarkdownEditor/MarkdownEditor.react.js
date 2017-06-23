import React, { Component, PropTypes } from 'react';
import './MarkdownEditor.less';
import MarkdownRichEditor from '../MarkdownRichEditor';
import PlainMarkdownEditor from '../PlainMarkdownEditor';
import TitledButton from '@opuscapita/react-buttons/lib/TitledButton';
import toggleViewSVG from '!!raw!@opuscapita/svg-icons/lib/remove_red_eye.svg';

const propTypes = {
  mode: PropTypes.oneOf('plain', 'rich'),
  onToggleMode: PropTypes.func
};
const defaultProps = {
  mode: 'rich',
  onToggleMode: () => {}
};

export default
class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleToggleMode = () => {
    this.props.onToggleMode();
  }

  render() {
    let {
      mode
    } = this.props;

    let editor = mode === 'plain' ?
        <PlainMarkdownEditor /> :
        <MarkdownRichEditor />;

    let toggleViewButtonLabel = mode === 'plain' ? 'Plain view' : 'Rich view';

    return (
      <div className="opuscapita_markdown-editor">
        {editor}
        <div className="opuscapita_markdown-editor__bottom-line">
          <TitledButton
            isActive={true}
            onClick={this.handleToggleMode}
            svg={toggleViewSVG}
            label={toggleViewButtonLabel}
            contentPosition="before"
            svgSize="16px"
            color="#333"
            bgColor="rgba(255, 255, 255, 0)"
            className="opuscapita_markdown-editor__toggle-view-button"
          />
        </div>
      </div>
    );
  }
}

MarkdownEditor.propTypes = propTypes;
MarkdownEditor.defaultProps = defaultProps;
