import { findLinkEntities, Link } from './link';
import { CompositeDecorator } from 'draft-js';

let decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);

export default decorator;
