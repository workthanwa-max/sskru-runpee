import { merge } from 'lodash';
import { card } from './components/card';
import { modal } from './components/modal';
import { defaultProps } from './default-props';

export function componentsOverrides() {
  const components = merge(defaultProps(), modal(), card());

  return components;
}
