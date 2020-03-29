import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Anchor, Paragraph, Heading, Image, Hr } from '@madebyconnor/bamboo-ui';

import Blockquote from '../components/blog/Blockquote';

const listStyles = ({ theme }) => css`
  margin-bottom: ${theme.spacing.m};
  padding-left: ${theme.spacing.l};
`;

const List = styled(Paragraph)(listStyles);

const listItemStyles = (theme) => css`
  margin-bottom: ${theme.spacing.s};
  margin-left: ${theme.spacing.s};
`;

export { Paragraph };
export const HeadingOne = (props) => <Heading as="h2" size="xl" {...props} />;
export const HeadingTwo = (props) => <Heading as="h3" size="l" {...props} />;
export const HeadingThree = (props) => <Heading as="h4" size="m" {...props} />;
export const Strong = (props) => (
  <Paragraph as="strong" weight="bold" {...props} />
);
export const Emphasis = (props) => (
  <Paragraph as="em" slope="italic" {...props} />
);
export const Quote = (props) => <Emphasis as="q" {...props} />;
export const OrderedList = (props) => <List as="ol" {...props} />;
export const UnorderedList = (props) => <List as="ul" {...props} />;
export const ListItem = (props) => (
  <Paragraph as="li" css={listItemStyles} {...props} />
);

const components = {
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  p: Paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  a: Anchor,
  em: Emphasis,
  strong: Strong,
  q: Quote,
  blockquote: Blockquote,
  img: Image,
  hr: Hr,
};

export default components;
