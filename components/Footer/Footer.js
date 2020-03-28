import React from 'react';
import {
  Anchor,
  Footer,
  useTheme,
  sharedPropTypes,
} from '@madebyconnor/bamboo-ui';

import { NAME, TWITTER } from '../../constants/site';

export default function CustomFooter({ children, ...rest }) {
  const theme = useTheme();
  return (
    <Footer siteName={NAME} siteTwitter={TWITTER} {...rest}>
      <Anchor href="/disclaimer" backgroundColor={theme.colors.n100}>
        Disclaimer
      </Anchor>
      {children}
    </Footer>
  );
}

CustomFooter.propTypes = {
  children: sharedPropTypes.childrenPropType,
};
