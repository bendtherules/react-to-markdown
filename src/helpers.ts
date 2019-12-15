import {
  ElementType,
  FunctionComponent,
  ComponentClass,
  PropsWithChildren,
  ReactText
} from "react";

export type ReactElementSubset<TProps = {}> = {
  props: PropsWithChildren<TProps>;
  type: ElementType<TProps>;
};

export type ReactElementSubsetWithPrimitive =
  | ReactElementSubset
  | ReactText
  | Array<ReactElementSubsetWithPrimitive>
  | null
  | undefined;

export function isFunctionalComponent(
  eleType: ElementType
): eleType is FunctionComponent {
  return (
    typeof eleType === "function" && // can be various things
    !(
      (eleType.prototype && eleType.prototype.isReactComponent) // native arrows don't have prototypes // special property
    )
  );
}

export function isClassComponent(
  eleType: ElementType
): eleType is ComponentClass {
  return !!(
    typeof eleType === "function" &&
    eleType.prototype &&
    eleType.prototype.isReactComponent
  );
}
