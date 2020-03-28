import React from 'react';
import { useTheme } from 'emotion-theming';
import { Anchor, Footer, propTypes } from '@madebyconnor/bamboo-ui';

import { NAME, TWITTER } from '../../constants/site';

export default function CustomFooter({ children, ...rest }) {
  const theme = useTheme();
  return (
    <Footer siteName={NAME} siteTwitter={TWITTER} {...rest}>
      <Anchor href="/disclaimer" backgroundColor={theme.color.neutral[100]}>
        Disclaimer
      </Anchor>
      {children}
    </Footer>
  );
}

CustomFooter.propTypes = {
  children: propTypes.childrenPropType,
};
