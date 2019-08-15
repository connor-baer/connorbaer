import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { truncate } from 'lodash/fp';
import {
  CoverImage,
  Heading,
  Paragraph,
  useTheme
} from '@madebyconnor/bamboo-ui';

import Link from '../../Link';

function getSizes(theme) {
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) 240px`;
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) 25vw`;
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

const Content = styled('div')(contentStyles);

const titleStyles = ({ theme }) => css`
  margin-top: 0;
  margin-bottom: ${theme.spacings.bit};
  color: #fff;
  font-family: Playfair Display, ${theme.fontStack.serif};
`;

const Title = styled(Heading)(titleStyles);

const subtitleContainerStyles = ({ theme }) => css`
  overflow: hidden;
  max-height: ${theme.spacings.exa};
  transition: max-height ${theme.animations.standard};

  a:hover &,
  a:focus & {
    max-height: 6.5rem;
    overflow: auto;
  }
`;

const SubtitleContainer = styled('p')(subtitleContainerStyles);

const subtitleStyles = ({ theme }) => css`
  display: block;
  margin-bottom: ${theme.spacings.bit};
  color: #fff;
`;

const Subtitle = styled(Paragraph)(subtitleStyles);

const actionStyles = ({ theme }) => css`
  color: #fff;
  display: block;
  opacity: 0;
  margin: 0;
  transition: opacity ${theme.animations.standard};

  a:hover &,
  a:focus & {
    opacity: 1;
  }
`;

const Action = styled(Paragraph)(actionStyles);

export default function GuidePreview({
  url,
  image = {},
  title,
  subtitle,
  className
}) {
  const theme = useTheme();
  const sizes = getSizes(theme);
  const truncatedSubtitle = truncate(
    {
      length: 55,
      separator: ' '
    },
    subtitle
  );
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article className={className}>
      <Link href={url} prefetch>
        <a>
          {image.src && (
            <CoverImage {...image} sizes={sizes} aspectRatio={3 / 5} />
          )}
          <Content>
            <Title as="h4">{title}</Title>
            <SubtitleContainer>
              <Subtitle size="kilo" as="span" lineHeight="kilo">
                {truncatedSubtitle}
              </Subtitle>
              <Action size="kilo" as="span" weight="bold">
                Explore →
              </Action>
            </SubtitleContainer>
          </Content>
        </a>
      </Link>
    </Article>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

GuidePreview.propTypes = {
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
