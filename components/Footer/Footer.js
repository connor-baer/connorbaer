import React from 'react';
import {
  Anchor,
  Footer,
  useTheme,
  sharedPropTypes
} from '@madebyconnor/bamboo-ui';

import { SITE_NAME, SITE_TWITTER } from '../../constants';

export default function CustomFooter({ children, ...rest }) {
  const theme = useTheme();
  return (
    <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER} {...rest}>
      <Anchor href="/disclaimer" backgroundColor={theme.colors.n100}>
        Disclaimer
      </Anchor>
      {children}
    </Footer>
  );
}

CustomFooter.propTypes = {
  children: sharedPropTypes.childrenPropType
};
