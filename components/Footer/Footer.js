import React from 'react';
import { Anchor, Footer, propTypes } from '@madebyconnor/bamboo-ui';

import { NAME, TWITTER } from '../../constants/site';

export default function CustomFooter({ children, ...rest }) {
  return (
    <Footer siteName={NAME} siteTwitter={TWITTER} {...rest}>
      <Anchor href="/disclaimer">Disclaimer</Anchor>
      {children}
    </Footer>
  );
}

CustomFooter.propTypes = {
  children: propTypes.childrenPropType,
};
