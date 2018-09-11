import React from 'react';
import { Heading, Text, Hr } from '@sumup/circuit-ui';

import Anchor from '../components/Anchor';

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

const components = {
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  h4: HeadingFour,
  h5: HeadingFive,
  h6: HeadingFive,
  p: Paragraph,
  a: Anchor,
  hr: Hr
};

export default components;