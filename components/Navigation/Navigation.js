import React from 'react';
import PropTypes from 'prop-types';
import { startsWith } from 'lodash/fp';
import { useRouter } from 'next/router';
import {
  Navigation,
  PandaIcon,
  sharedPropTypes
} from '@madebyconnor/bamboo-ui';

import usePreview from '../../hooks/use-preview';
import { SITE_NAME } from '../../constants';

export default function CustomNavigation({
  siteName = SITE_NAME,
  siteLogo = <PandaIcon alt="Panda" />,
  links = [
    { url: '/about', label: '✌️ About' },
    { url: '/projects', label: '💡 Projects' },
    { url: '/blog', label: '🖋️ Blog' }
  ]
}) {
  const router = useRouter();
  const isPreview = usePreview();
  const isHomepage = router.asPath === '/';
  if (isPreview) {
    links.push({ url: '/travel', label: '🧳 Travel' });
  }
  const enhancedLinks = links.map(link => {
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
  siteLogo: sharedPropTypes.childrenPropType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: sharedPropTypes.childrenPropType,
      url: PropTypes.string,
      icon: sharedPropTypes.childrenPropType
    })
  )
};
