import React, { Component, PropTypes } from 'react';
import s from './RichEditorToolbar.module.less';
import defaultFeaturesTranslations from '../RichEditor/lib/features-translations';
import TitledButton from '@opuscapita/react-buttons/lib/TitledButton';

export default
class RichEditorToolbar extends Component {
  render() {
    let {
      activeFeatures,
      editorState, // eslint-disable-line no-unused-vars
      features,
      featuresTranslations,
      locale,
      onGetFeatureHandler,
      restrictorNode,
      ...restProps
    } = this.props;

    let getMessage = (message) => featuresTranslations[locale][message];

    return (
      <div className={s.richEditorToolbar} { ...restProps }>
        {features.map((feature, index) => (
          <div className={s.featureButton} key={index}>
            <TitledButton
              isActive={Boolean(activeFeatures.find(activeFeature => activeFeature === feature.id))}
              onClick={() => onGetFeatureHandler(feature)}
              restrictorNode={restrictorNode}
              svg={feature.svg}
              title={getMessage(feature.id)}
              svgSize="24px"
              color="#333"
              bgColor="rgba(255, 255, 255, 0)"
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
  featuresTranslations: PropTypes.object,
  locale: PropTypes.string,
  restrictorNode: PropTypes.object,
  onGetFeatureHandler: PropTypes.func
};

RichEditorToolbar.defaultProps = {
  activeFeatures: [],
  features: [],
  featuresTranslations: defaultFeaturesTranslations,
  locale: 'en'
};
