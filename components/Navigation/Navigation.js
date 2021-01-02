import React from 'react';
import PropTypes from 'prop-types';
import { startsWith } from 'lodash/fp';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Navigation as BambooNavigation,
  PandaIcon,
  propTypes,
} from '@madebyconnor/bamboo-ui';

import usePreview from '../../hooks/usePreview';
import { NAME } from '../../constants/site';
import { useCMS } from '../../cms';

const editableStyles = ({ theme, isEditable }) =>
  isEditable &&
  css`
    ${theme.mq.lap} {
      top: 62px !important;
    }
  `;

const variantStyles = ({ theme, variant }) =>
  variant === 'sidebar' &&
  css`
    ${theme.mq.lap} {
      width: calc(100vw - 25rem);
      min-width: calc(100vw - 30vw);
    }
  `;

const StyledNavigation = styled(BambooNavigation)(
  variantStyles,
  editableStyles,
);

export default function Navigation({
  siteName = NAME,
  siteLogo = <PandaIcon alt="Panda" />,
  links = [
    { url: '/about', icon: '✌️', label: 'About' },
    { url: '/projects', icon: '💡', label: 'Projects' },
    { url: '/blog', icon: '🖋️', label: 'Blog' },
  ],
  variant,
}) {
  const router = useRouter();

  const cms = useCMS();
  const isEditable = cms.enabled;
  const isTravelPreview = usePreview('travel');
  const isFoodPreview = usePreview('food');

  if (isTravelPreview) {
    links.push({ url: '/travel', icon: '🧳', label: 'Travel' });
  }
  if (isFoodPreview) {
    links.push({ url: '/food', icon: '🥑', label: 'Food' });
  }

  const isHomepage = router.asPath === '/';

  const enhancedLinks = links.map((link) => {
    const isActive = startsWith(link.url, router.asPath);
    return { ...link, isActive };
  });

  return (
    <StyledNavigation
      brand={{ siteName, siteLogo, isHomepage }}
      links={enhancedLinks}
      isEditable={isEditable}
      variant={variant}
    />
  );
}

Navigation.propTypes = {
  siteName: PropTypes.string,
  siteLogo: propTypes.childrenPropType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: propTypes.childrenPropType,
      url: PropTypes.string,
      icon: propTypes.childrenPropType,
    }),
  ),
  variant: PropTypes.oneOf(['sidebar']),
};
