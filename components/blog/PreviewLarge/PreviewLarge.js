import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { CoverImage, Heading, Paragraph } from '@madebyconnor/bamboo-ui';

import { blogPostPropType } from '../../../utils/prop-types';
import Link from '../../Link';
import PostMeta from '../PostMeta';

function getSizes(theme) {
  const deskSize = `(min-width: ${theme.breakpoints.desk}) 755px`;
  const lapSize = `(min-width: ${theme.breakpoints.lap}) 620px`;
  const mobileSize = '100vw';

  return [deskSize, lapSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: calc(${theme.spacing.gutter} * 2);
  margin-bottom: calc(${theme.spacing.gutter} * 4);

  ${theme.mq.hand} {
    margin-bottom: calc(${theme.spacing.gutter} * 2);
  }
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-bottom: ${theme.spacing.s};

  a:focus &,
  a:hover & {
    text-decoration: underline;
  }
`;

const Title = styled(Heading)(titleStyles);

const descriptionStyles = ({ theme }) => css`
  color: ${theme.color.bodyColor};
`;

const Description = styled(Paragraph)(descriptionStyles);

const imageStyles = (theme) => css`
  margin-bottom: ${theme.spacing.xl};
`;

export default function PreviewLarge({
  url,
  image = {},
  title,
  description,
  date,
  category,
  featured = false,
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={url}>
        <a>
          {featured && image.src && (
            <CoverImage
              {...image}
              sizes={sizes}
              aspectRatio={350 / 150}
              css={imageStyles}
            />
          )}
          <Title size="xl">{title}</Title>
          {description && <Description>{description}</Description>}
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = blogPostPropType;
