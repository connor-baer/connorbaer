import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Heading, Paragraph } from '@madebyconnor/bamboo-ui';

import { blogPostPropType } from '../../../utils/prop-types';
import Link from '../../Link';
import PostMeta from '../PostMeta';

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.giga};
`;

const Article = styled('article')(articleStyles);

const titleStyles = () => css`
  margin-top: 0;
`;

const Title = styled(Heading)(titleStyles);

const descriptionStyles = ({ theme }) => css`
  color: ${theme.colors.bodyColor};
`;

const Description = styled(Paragraph)(descriptionStyles);

export default function PreviewSmall({
  url,
  title,
  description,
  date,
  category,
  className,
}) {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article className={className}>
      <Link href={url}>
        <a>
          <Title size="giga" as="h4">
            {title}
          </Title>
          {description && <Description>{description}</Description>}
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewSmall.propTypes = blogPostPropType;
