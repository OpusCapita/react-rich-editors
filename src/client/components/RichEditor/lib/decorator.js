import React, { PropTypes } from 'react';
import { findLinkEntities } from './link';
import { CompositeDecorator, Entity } from 'draft-js';

let Link = (props) => {
  let { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} title={url} style={{ textDecoration: 'underiline' }}>
      {props.children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.number
}

let decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);

export default decorator;
