import { heading } from 'mdast-builder';
// tslint:disable-next-line: no-implicit-dependencies
import { Node as MDASTNode, Parent as MDASTParent } from 'unist';
import { IReactElementSubset } from './helpers';

export default function handleTag(
  node: IReactElementSubset,
  parentASTNode: MDASTParent
) {
  const { type: tagType } = node;

  let childASTNode: MDASTNode | undefined;
  let newParentASTNode: MDASTParent | undefined;

  switch (tagType) {
    case 'h1':
      newParentASTNode = childASTNode = heading(1);
      break;

    case 'strong':
      newParentASTNode = childASTNode = strong();
      break;
    case 'em':
      newParentASTNode = childASTNode = emphasis();
      break;

    default:
      newParentASTNode = parentASTNode;
      break;
  }

  if (childASTNode !== undefined) {
    parentASTNode.children.push(childASTNode);
  }

  return newParentASTNode;
}
