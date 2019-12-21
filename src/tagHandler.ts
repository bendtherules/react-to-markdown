import {
  blockquote,
  code,
  emphasis,
  heading,
  image,
  inlineCode,
  link,
  list,
  listItem,
  paragraph,
  strong,
} from 'mdast-builder';
import {
  AnchorHTMLAttributes,
  Children as ReactChildren,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
// tslint:disable-next-line: no-implicit-dependencies
import { Node as MDASTNode, Parent as MDASTParent } from 'unist';

import {
  IReactElementSubset,
  ReactElementSubsetWithPrimitive,
} from './helpers';

export default function handleTag(
  node: IReactElementSubset,
  parentASTNode: MDASTParent,
  extraProps = {}
) {
  const { type: tagType } = node;

  let childASTNode: MDASTNode | undefined;
  let newParentASTNode: MDASTParent | undefined;

  switch (tagType) {
    // START - Handle paragraph
    case 'p': {
      newParentASTNode = childASTNode = paragraph();
      break;
    }
    // END - Handle paragraph

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
    case 'h6':
      newParentASTNode = childASTNode = heading(6);
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

    // START - Handle img tag - with src and alt
    case 'img': {
      const props = node.props as ImgHTMLAttributes<any>;
      let source = '';
      if (props.src !== undefined) {
        source = props.src;
      }
      newParentASTNode = childASTNode = image(source, props.title, props.alt);
      break;
    }
    // END - Handle img tag - with src and alt

    // START - Handle anchor tag (link)
    case 'a': {
      const props = node.props as AnchorHTMLAttributes<any>;
      let href = '';
      if (props.href !== undefined) {
        href = props.href;
      }
      newParentASTNode = childASTNode = link(href, props.title);
      break;
    }
    // END - Handle anchor tag (link)

    // START - Handle blockquote
    case 'blockquote': {
      newParentASTNode = childASTNode = blockquote();
      break;
    }
    // END - Handle blockquote

    // START - Handle code
    case 'code': {
      // tslint:disable-next-line: no-object-literal-type-assertion
      const props = { ...node.props, ...extraProps } as HTMLAttributes<any> & {
        inline?: boolean;
      };

      let lang = '';
      if (props.lang !== undefined) {
        lang = props.lang;
      }

      let value = '';
      if (props.children !== undefined) {
        const onlyChild = props.children;
        if (typeof onlyChild === 'string' || typeof onlyChild === 'number') {
          value = onlyChild.toString();
        }
      }

      let isInline = true;
      if (props.inline !== undefined) {
        isInline = !!props.inline;
      }

      if (isInline) {
        childASTNode = inlineCode(value);
      } else {
        childASTNode = code(lang, value);
      }
      break;
    }
    // END - Handle code

    // START - Handle pre.code
    case 'pre': {
      const childrenArray = ReactChildren.toArray(node.props.children);
      if (childrenArray.length === 1) {
        let onlyChild = childrenArray[0] as ReactElementSubsetWithPrimitive;
        if (
          onlyChild instanceof Object &&
          (onlyChild as IReactElementSubset).type === 'code'
        ) {
          onlyChild = onlyChild as IReactElementSubset;

          handleTag(onlyChild, parentASTNode, { inline: false });
        }
      }
      break;
    }
    // END - Handle blockquote

    default:
      newParentASTNode = parentASTNode;
      break;
  }

  if (childASTNode !== undefined) {
    parentASTNode.children.push(childASTNode);
  }

  return newParentASTNode;
}
