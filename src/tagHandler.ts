import { emphasis, heading, strong, list, listItem } from 'mdast-builder';
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
    // START - Handle all headings
    case 'h1':
      newParentASTNode = childASTNode = heading(1);
      break;
    case 'h2':
      newParentASTNode = childASTNode = heading(2);
      break;
    case 'h3':
      newParentASTNode = childASTNode = heading(3);
      break;
    case 'h4':
      newParentASTNode = childASTNode = heading(4);
      break;
    case 'h5':
      newParentASTNode = childASTNode = heading(5);
      break;
    // END - Handle all headings

    // START - Handle strong and em
    case 'strong':
      newParentASTNode = childASTNode = strong();
      break;
    case 'em':
      newParentASTNode = childASTNode = emphasis();
      break;
    // END - Handle strong and em

    // START - Handle lists - ul, ol, li
    case 'ul':
      newParentASTNode = childASTNode = list('unordered', []);
      break;
    case 'ol':
      newParentASTNode = childASTNode = list('ordered', []);
      break;
    case 'li':
      newParentASTNode = childASTNode = listItem([]);
      break;

    // END - Handle lists - ul, ol, li

    default:
      newParentASTNode = parentASTNode;
      break;
  }

  if (childASTNode !== undefined) {
    parentASTNode.children.push(childASTNode);
  }

  return newParentASTNode;
}
