import {
  ComponentClass,
  ElementType,
  FunctionComponent,
  PropsWithChildren,
  ReactText,
} from 'react';

export interface IReactElementSubset<TProps = {}> {
  props: PropsWithChildren<TProps>;
  type: ElementType<TProps>;
}

export type ReactElementSubsetWithPrimitive =
  | IReactElementSubset
  | ReactText
  | ReactElementSubsetWithPrimitive[]
  | null
  | undefined;

export function isFunctionalComponent(
  eleType: ElementType
): eleType is FunctionComponent {
  return (
    typeof eleType === 'function' && // can be various things
    !(
      (eleType.prototype && eleType.prototype.isReactComponent) // native arrows don't have prototypes // special property
    )
  );
}

export function isClassComponent(
  eleType: ElementType
): eleType is ComponentClass {
  return !!(
    typeof eleType === 'function' &&
    eleType.prototype &&
    eleType.prototype.isReactComponent
  );
}
