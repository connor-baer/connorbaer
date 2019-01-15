import React from 'react';
import PropTypes from 'prop-types';
import { sharedPropTypes } from '@sumup/circuit-ui';
import { Navigation, PandaIcon } from '@madebyconnor/bamboo-ui';

import { SITE_NAME } from '../../constants';

const CustomNavigation = ({ siteName, siteLogo, links }) => (
  <Navigation>
    <Navigation.Brand siteName={siteName} siteLogo={siteLogo} />
    <Navigation.Links links={links} />
    <Navigation.Menu />
  </Navigation>
);

CustomNavigation.propTypes = {
  siteName: PropTypes.string,
  siteLogo: sharedPropTypes.chidrenPropType,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: sharedPropTypes.childrenPropType,
      url: PropTypes.string,
      icon: sharedPropTypes.childrenPropType
    })
  )
};

CustomNavigation.defaultProps = {
  siteName: SITE_NAME,
  siteLogo: <PandaIcon />,
  links: [
    { url: '/about', label: 'About' },
    { url: '/projects', label: 'Projects' },
    { url: '/blog', label: 'Blog' }
  ]
};

/**
 * @component
 */
export default CustomNavigation;
