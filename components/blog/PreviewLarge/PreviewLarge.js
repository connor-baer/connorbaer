import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { CoverImage, Heading, Paragraph } from '@madebyconnor/bamboo-ui';

import { blogPostPropType } from '../../../utils/prop-types';
import Link from '../../Link';
import PostMeta from '../PostMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 755px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 620px`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.zetta};

  ${theme.mq.kilo} {
    margin-bottom: 72px;
  }
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
`;

const Title = styled(Heading)(titleStyles);

const descriptionStyles = ({ theme }) => css`
  color: ${theme.colors.bodyColor};
`;

const Description = styled(Paragraph)(descriptionStyles);

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
            <CoverImage {...image} sizes={sizes} aspectRatio={350 / 150} />
          )}
          <Title size="tera">{title}</Title>
          {description && <Description>{description}</Description>}
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = blogPostPropType;
