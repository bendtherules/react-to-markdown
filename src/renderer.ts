import { Children as ReactChildren } from "react";
import {
  ReactElementSubset,
  ReactElementSubsetWithPrimitive,
  isFunctionalComponent,
  isClassComponent
} from "./helpers";

function render(
  node: ReactElementSubsetWithPrimitive,
  parentNode?: ReactElementSubset
) {
  // Skip null and undefined nodes
  if (node === null || node === undefined) {
    return;
  }

  // Render string and number nodes
  if (typeof node === "string" || typeof node === "number") {
    return;
  }

  // Render Fragment nodes
  if (Array.isArray(node)) {
    node.forEach(fragmentEle => render(fragmentEle));
    return;
  }

  const { props, type: elementType } = node;
  const { children } = props;

  if (isFunctionalComponent(elementType)) {
    const renderOutput = elementType.call(
      null,
      props
    ) as ReactElementSubsetWithPrimitive;

    render(renderOutput);
    return;
  }

  if (isClassComponent(elementType)) {
    const elementInstance = new elementType(props);
    const renderOutputRaw = elementInstance.render();
    const renderOutput = ReactChildren.toArray(
      renderOutputRaw
    ) as ReactElementSubsetWithPrimitive[];

    // Render array of children, just like fragments
    render(renderOutput);

    return;
  }

  // Handle intrinsic types of element like div, h1
  {
  }
}

export { render };
