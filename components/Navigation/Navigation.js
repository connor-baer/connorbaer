import React from 'react';
import PropTypes from 'prop-types';
import { startsWith } from 'lodash/fp';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import { Navigation, PandaIcon, propTypes } from '@madebyconnor/bamboo-ui';

import usePreview from '../../hooks/use-preview';
import { NAME } from '../../constants/site';
import { useCMS } from '../../cms';

const editableStyles = (isEditable) => (theme) =>
  isEditable &&
  css`
    ${theme.mq.lap} {
      top: 62px !important;
    }
  `;

export default function CustomNavigation({
  siteName = NAME,
  siteLogo = <PandaIcon alt="Panda" />,
  links = [
    { url: '/about', icon: '✌️', label: 'About' },
    { url: '/projects', icon: '💡', label: 'Projects' },
    { url: '/blog', icon: '🖋️', label: 'Blog' },
  ],
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
    <Navigation
      brand={{ siteName, siteLogo, isHomepage }}
      links={enhancedLinks}
      css={editableStyles(isEditable)}
    />
  );
}

CustomNavigation.propTypes = {
  siteName: PropTypes.string,
  siteLogo: propTypes.childrenPropType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: propTypes.childrenPropType,
      url: PropTypes.string,
      icon: propTypes.childrenPropType,
    }),
  ),
};
