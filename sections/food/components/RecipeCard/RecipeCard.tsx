import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CoverImage, Heading, styles } from '@madebyconnor/bamboo-ui';

import Link from '../../../../components/Link';
import { ImageProps } from '../../../../types/media';

const Article = styled('article')`
  position: relative;
  margin-top: 2%;
  margin-bottom: 2%;
  transform: rotate(-2deg);
`;

const Image = styled(CoverImage)`
  border-radius: 0;
`;

const titleStyles = ({ theme }) => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  margin: 0;
  padding: ${theme.spacing.l};
  color: white;
  text-align: center;
  text-shadow: 0px 0px 12px ${theme.color.shadow},
    0px 0px 3px ${theme.color.shadow};
  font-family: ${theme.fontStack.display};
`;

const Title = styled(Heading)(titleStyles);

const aStyles = ({ theme }) => css`
  display: block;

  &:focus {
    ${styles.focusOutline(theme)};
  }
`;

const A = styled('a')(aStyles);

export interface RecipeCardProps {
  title: string;
  image: ImageProps;
  url: string;
}

export function RecipeCard({ url, image, title, ...props }: RecipeCardProps) {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article {...props}>
      <Link href={url}>
        <A>
          <Image {...image} aspectRatio={2 / 3} next />
          <Title as="h3" size="xl">
            {title}
          </Title>
        </A>
      </Link>
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}
