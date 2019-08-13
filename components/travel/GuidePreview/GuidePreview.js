import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  CoverImage,
  Heading,
  Paragraph,
  useTheme
} from '@madebyconnor/bamboo-ui';

import Link from '../../Link';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 355px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 290px`;
  const kiloSize = `(min-width: ${theme.breakpoints.kilo}px) 50vw`;
  const mobileSize = '100vw';

  return [gigaSize, megaSize, kiloSize, mobileSize].join(', ');
}

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
  position: relative;
`;

const Article = styled('article')(articleStyles);

const contentStyles = ({ theme }) => css`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${theme.spacings.peta} ${theme.spacings.mega} ${theme.spacings.mega};
  background: linear-gradient(transparent, ${theme.colors.shadow});
  border-bottom-left-radius: ${theme.borderRadius.giga};
  border-bottom-right-radius: ${theme.borderRadius.giga};
`;

const Content = styled('h2')(contentStyles);

const titleStyles = () => css`
  margin: 0;
  color: #fff;
`;

const Title = styled(Heading)(titleStyles);

const subtitleContainerStyles = ({ theme }) => css`
  overflow: hidden;
  height: ${theme.spacings.tera};
`;

const SubtitleContainer = styled('p')(subtitleContainerStyles);

const subtitleStyles = () => css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  color: #fff;
  display: block;
`;

const Subtitle = styled(Paragraph)(subtitleStyles);

export default function PreviewSmall({
  url,
  image = {},
  title,
  subtitle,
  className
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article className={className}>
      <Link href={url} prefetch>
        <a>
          {image.src && (
            <CoverImage {...image} sizes={sizes} aspectRatio={3 / 5} />
          )}
          <Content>
            <Title>{title}</Title>
            <SubtitleContainer>
              <Subtitle size="kilo" as="span">
                {subtitle}
              </Subtitle>
            </SubtitleContainer>
          </Content>
        </a>
      </Link>
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PreviewSmall.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    colors: PropTypes.array,
    alt: PropTypes.string
  }),
  className: PropTypes.string
};
