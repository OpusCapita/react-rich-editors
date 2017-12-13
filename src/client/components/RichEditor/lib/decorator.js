import PropTypes from 'prop-types';
import React from 'react';
import { findLinkEntities } from './link';
import { CompositeDecorator, Entity } from 'draft-js';

let Link = (props) => {
  let url = props.entityKey ? Entity.get(props.entityKey).getData().url : '';
  return (
    <a href={url} title={url} style={{ textDecoration: 'underiline' }}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.string
}

let decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);

export default decorator;
