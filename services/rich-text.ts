import { cloneElement, isValidElement, ReactNode } from 'react';
import { Node, Text, Element } from 'slate';

type RenderElementProps = {
  element: any;
  attributes?: { [key: string]: any };
  children: any;
};

type RenderLeafProps = {
  children: any;
  attributes: { [key: string]: any };
};

export interface RichTextOptions {
  renderElement: (props: RenderElementProps) => JSX.Element;
  renderLeaf: (props: RenderLeafProps) => JSX.Element;
}

function addKey(element: ReactNode, key: number): ReactNode {
  if (isValidElement(element) && element.key === null) {
    return cloneElement(element, { key });
  }
  return element;
}

function render(node: Node, options: RichTextOptions): JSX.Element | string {
  if (Text.isText(node)) {
    return node.text;
  }

  const { children: c, ...element } = node;

  const children = node.children.map((n) => render(n, options));

  if (Element.isElement(node)) {
    return options.renderElement({ element, children });
  }

  return options.renderLeaf({ attributes: element, children });
}

export function toReact(nodes: Node[], options: RichTextOptions): ReactNode {
  return nodes.map(
    (node: Node, index: number): ReactNode =>
      addKey(render(node, options), index),
  );
}

export function toPlainText(nodes: Node[]): string {
  return nodes.map((n) => Node.string(n)).join('\n');
}
