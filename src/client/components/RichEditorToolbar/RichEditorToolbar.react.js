import React, { Component, PropTypes } from 'react';
import s from './RichEditorToolbar.module.less';
import HotKeyButton from 'jcatalog-react-ui-buttons/lib/HotKeyButton';

export default
class RichEditorToolbar extends Component {
  render() {
    let {
      activeFeatures,
      editorState,
      features,
      onGetFeatureHandler,
      onBlockTypeToggle,
      onChange,
      onInlineStyleToggle
    } = this.props;

    return (
      <div className={s.richEditorToolbar}>
        {features.map((feature, index) => (
          <div className={s.featureButton} key={index}>
            <HotKeyButton
              isActive={activeFeatures.find(activeFeature => activeFeature === feature.id)}
              onClick={() => onGetFeatureHandler(feature)}
              svg={feature.svg}
              svgSize="24px"
              color="#333"
              bgColor="rgba(255, 255, 255, 0)"
              title={feature.label}
            />
          </div>
        ))}
      </div>
    );
  }
}

RichEditorToolbar.propTypes = {
  activeFeatures: PropTypes.arrayOf(PropTypes.string),
  editorState: PropTypes.object,
  featureGroups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    featureNames: PropTypes.string
  })),
  features: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    svg: PropTypes.string,
    type: PropTypes.string
  })),
  onGetFeatureHandler: PropTypes.func
};

RichEditorToolbar.defaultProps = {
  activeFeatures: [],
  features: []
};
