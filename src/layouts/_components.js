import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Anchor, Image, Hr } from '@madebyconnor/bamboo-ui';

import Blockquote from '../components/blog/Blockquote';

const headingOneStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.peta};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.kilo};
  margin-top: ${theme.spacings.exa};
`;

export const HeadingOne = styled('h2')(headingOneStyles);

const headingTwoStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.tera};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.kilo};
  margin-top: ${theme.spacings.exa};
`;

export const HeadingTwo = styled('h3')(headingTwoStyles);

const headingThreeStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.giga};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.kilo};
  margin-top: ${theme.spacings.exa};
`;

export const HeadingThree = styled('h4')(headingThreeStyles);

const headingFourStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.mega};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.kilo};
  margin-top: ${theme.spacings.exa};
`;

export const HeadingFour = styled('h5')(headingFourStyles);

const textStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.mega};
  line-height: ${theme.lineHeights.giga};
  margin-top: ${theme.spacings.kilo};
`;

export const Paragraph = styled('p')(textStyles);

const italicStyles = () => css`
  font-style: italic;
`;

export const Em = styled('em')(textStyles, italicStyles);

const boldStyles = ({ theme }) => css`
  font-weight: ${theme.fontWeight.bold};
`;

export const Strong = styled('strong')(textStyles, boldStyles);

export const Quote = Em.withComponent('q');

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

export const Ul = styled('ul')(textStyles, listStyles);

export const Ol = Ul.withComponent('ol');

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
