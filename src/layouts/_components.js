import React from 'react';
import { Heading, Text, Hr, List } from '@sumup/circuit-ui';

import Anchor from '../components/Anchor';
import Blockquote from '../components/blog/Blockquote';
import Image from '../components/images/Image';

export const HeadingOne = ({ children, ...rest }) => (
  <Heading element="h2" size={Heading.EXA} {...rest}>
    {children}
  </Heading>
);

export const HeadingTwo = ({ children, ...rest }) => (
  <Heading element="h3" size={Heading.PETA} {...rest}>
    {children}
  </Heading>
);

export const HeadingThree = ({ children, ...rest }) => (
  <Heading element="h4" size={Heading.TERA} {...rest}>
    {children}
  </Heading>
);

export const HeadingFour = ({ children, ...rest }) => (
  <Heading element="h5" size={Heading.GIGA} {...rest}>
    {children}
  </Heading>
);

export const HeadingFive = ({ children, ...rest }) => (
  <Heading element="h6" size={Heading.GIGA} {...rest}>
    {children}
  </Heading>
);

export const Paragraph = ({ children, ...rest }) => (
  <Text size={Text.GIGA} {...rest}>
    {children}
  </Text>
);

export const Em = ({ children, ...rest }) => (
  <Text size={Text.GIGA} element="em" italic {...rest}>
    {children}
  </Text>
);

export const Strong = ({ children, ...rest }) => (
  <Text size={Text.GIGA} element="strong" bold {...rest}>
    {children}
  </Text>
);

export const Quote = ({ children, ...rest }) => (
  <Text size={Text.GIGA} element="q" italic {...rest}>
    {children}
  </Text>
);

export const Ul = ({ children, ...rest }) => (
  <List size={List.GIGA} {...rest}>
    {children}
  </List>
);

export const Ol = ({ children, ...rest }) => (
  <List size={List.GIGA} ordered {...rest}>
    {children}
  </List>
);

const components = {
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  h4: HeadingFour,
  h5: HeadingFive,
  h6: HeadingFive,
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
