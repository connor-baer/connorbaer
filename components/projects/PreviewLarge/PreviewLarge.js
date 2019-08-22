import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { CoverImage, Heading, useTheme } from '@madebyconnor/bamboo-ui';

import { projectPropType } from '../../../utils/prop-types';
import Link from '../../Link';
import ProjectMeta from '../ProjectMeta';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 555px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 455px`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo} {
    margin-top: ${theme.spacings.exa};
  }
`;

const Article = styled('article')(articleStyles);

const titleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
`;

const Title = styled(Heading)(titleStyles);

export default function PreviewLarge({ url, image = {}, title, skills }) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={url}>
        <a>
          {image.src && (
            <CoverImage {...image} sizes={sizes} aspectRatio={500 / 500} />
          )}
          <Title as="h3">{title}</Title>
        </a>
      </Link>
      <ProjectMeta skills={skills} />
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewLarge.propTypes = projectPropType;
