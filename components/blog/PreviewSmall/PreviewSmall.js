import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Heading, Paragraph, styles } from '@madebyconnor/bamboo-ui';

import { blogPostPropType } from '../../../utils/prop-types';
import Link from '../../Link';
import PostMeta from '../PostMeta';

const Article = styled('article')(styles.spacing([1, 0]));

const titleStyles = () => css`
  margin-top: 0;
`;

const Title = styled(Heading)(titleStyles);

const descriptionStyles = ({ theme }) => css`
  color: ${theme.color.bodyColor};
`;

const Description = styled(Paragraph)(descriptionStyles);

export default function PreviewSmall({
  url,
  title,
  description,
  date,
  category,
  ...props
}) {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article {...props}>
      <Link href={url}>
        <a>
          <Title size="l" as="h4">
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
