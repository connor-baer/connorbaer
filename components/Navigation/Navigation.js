import React from 'react';
import PropTypes from 'prop-types';
import { startsWith } from 'lodash/fp';
import { useRouter } from 'next/router';
import { Navigation, PandaIcon, propTypes } from '@madebyconnor/bamboo-ui';

import usePreview from '../../hooks/use-preview';
import { NAME } from '../../constants/site';

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
  const isTravelPreview = usePreview('travel');
  const isHomepage = router.asPath === '/';
  if (isTravelPreview) {
    links.push({ url: '/travel', label: '🧳 Travel' });
  }
  const enhancedLinks = links.map((link) => {
    const isActive = startsWith(link.url, router.asPath);
    return { ...link, isActive };
  });

  return (
    <Navigation>
      <Navigation.Brand
        siteName={siteName}
        siteLogo={siteLogo}
        isHomepage={isHomepage}
      />
      <Navigation.Links links={enhancedLinks} />
      <Navigation.Menu />
    </Navigation>
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
