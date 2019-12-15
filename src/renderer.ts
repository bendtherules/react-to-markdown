import { root, text } from "mdast-builder";
import { Children as ReactChildren } from "react";
import * as stringify from "remark-stringify";
import * as unified from "unified";
import { Parent as MDASTParent } from "unist";

import {
  isClassComponent,
  isFunctionalComponent,
  ReactElementSubsetWithPrimitive
} from "./helpers";

function render(
  node: ReactElementSubsetWithPrimitive,
  parentASTNode?: MDASTParent
): string | null {
  let parentASTNodeMod: MDASTParent;
  if (parentASTNode === undefined) {
    parentASTNodeMod = root([]);
  } else {
    parentASTNodeMod = parentASTNode;
  }

  if (node === null || node === undefined) {
    // Handle (skip) null and undefined nodes
  } else if (typeof node === "string" || typeof node === "number") {
    // Handle (render) string and number nodes as string in markdown

    const currASTNode = text(node.toString());
    parentASTNodeMod.children.push(currASTNode);
  } else if (Array.isArray(node)) {
    // Handle (render) Fragment nodes or arrays

    node.forEach(fragmentEle => render(fragmentEle, parentASTNodeMod));
  } else {
    const { props, type: elementType } = node;

    // Handle nested function or class components
    {
      if (isFunctionalComponent(elementType)) {
        const renderOutputRaw = elementType.call(null, props);
        const renderOutput = ReactChildren.toArray(
          renderOutputRaw
        ) as ReactElementSubsetWithPrimitive[];

        // Render processed array of children
        render(renderOutput, parentASTNodeMod);
      }

      if (isClassComponent(elementType)) {
        const elementInstance = new elementType(props);
        const renderOutputRaw = elementInstance.render();
        const renderOutput = ReactChildren.toArray(
          renderOutputRaw
        ) as ReactElementSubsetWithPrimitive[];

        // Render processed array of children
        render(renderOutput, parentASTNodeMod);

      }
    }

    // Handle intrinsic types of element like div, h1
    {
    }

    {
      // Handle children
      const { children } = props;

      // Render processed array of children
      const renderOutput = ReactChildren.toArray(
        children
      ) as ReactElementSubsetWithPrimitive[];

      render(renderOutput, parentASTNodeMod);
    }
  }

  // Return stuff
  {
    // For root call, return string
    if (parentASTNode === undefined && parentASTNodeMod.children.length > 0) {
      const processor = unified().use(stringify, {
        bullet: "-",
        fence: "`",
        fences: true,
        incrementListMarker: false
      });
      const output = processor.stringify(parentASTNodeMod);

      return output;
    }
    return null;
  }
}

export { render };
