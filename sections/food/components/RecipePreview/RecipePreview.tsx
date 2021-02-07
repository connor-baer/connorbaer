import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CoverImage, Heading, styles } from '@madebyconnor/bamboo-ui';

import Link from '../../../../components/Link';
import { ImageProps } from '../../../../types/media';

const articleStyles = ({ theme }) => css`
  margin: calc(3 * ${theme.spacing.gutter}) 0;
`;

const Article = styled('article')(articleStyles);

const Image = styled(CoverImage)`
  border-radius: 0;
`;

const titleStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.display};

  ${theme.mq.hand} {
    margin: 0;
    padding-right: calc(2 * ${theme.spacing.gutter});
  }

  a:focus &,
  a:hover & {
    text-decoration: underline;
  }
`;

const Title = styled(Heading)(titleStyles);

const aStyles = ({ theme }) => css`
  ${styles.focusVisible(theme)};

  ${theme.mq.hand} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: calc(3 * ${theme.spacing.gutter});
    align-items: center;
  }
`;

const A = styled('a')(aStyles);

export interface RecipePreviewProps {
  title: string;
  image: ImageProps;
  url: string;
}

export function RecipePreview({
  url,
  image,
  title,
  ...props
}: RecipePreviewProps) {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article {...props}>
      <Link href={url}>
        <A>
          {image && <Image {...image} aspectRatio={4 / 3} next />}
          <Title as="h3" size="xxl">
            {title}
          </Title>
        </A>
      </Link>
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}
