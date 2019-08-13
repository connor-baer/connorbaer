import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Anchor, Paragraph, Heading, Image, Hr } from '@madebyconnor/bamboo-ui';

import Blockquote from '../components/blog/Blockquote';

export { Paragraph };
export const HeadingOne = props => <Heading as="h2" size="peta" {...props} />;
export const HeadingTwo = props => <Heading as="h3" size="tera" {...props} />;
export const HeadingThree = props => <Heading as="h4" size="giga" {...props} />;
export const HeadingFour = props => <Heading as="h5" size="mega" {...props} />;
export const Em = props => <Paragraph as="em" slope="italic" {...props} />;
export const Quote = props => <Em as="q" {...props} />;
export const Strong = props => (
  <Paragraph as="strong" weight="bold" {...props} />
);

const listStyles = ({ theme }) => css`
  margin-bottom: ${theme.spacings.mega};
  margin-left: ${theme.spacings.kilo};
  padding-left: ${theme.spacings.mega};

  li {
    margin-bottom: ${theme.spacings.kilo};
    margin-left: ${theme.spacings.kilo};
  }

  ul,
  ol {
    margin-left: ${theme.spacings.kilo};
  }
`;

export const List = styled(Paragraph)(listStyles);

export const Ol = List.withComponent('ol');
export const Ul = List.withComponent('ul');

const components = {
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  h4: HeadingFour,
  p: Paragraph,
  ul: Ul,
  ol: Ol,
  a: Anchor,
  em: Em,
  strong: Strong,
  q: Quote,
  blockquote: Blockquote,
  img: Image,
  hr: Hr
};

export default components;
