import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
// import { Grid, Text } from '@sumup/circuit-ui';

import { SITE_NAME, SITE_TWITTER } from '../../constants';
import Link from '../Link';

const wrapperStyles = ({ theme }) => css`
  background-color: ${theme.colors.n100};
`;

// const Wrapper = Grid.withComponent('footer');
const Wrapper = styled('div')(wrapperStyles);

const contentStyles = ({ theme }) => css`
  display: block;
  padding-top: ${theme.spacings.kilo};
  padding-bottom: ${theme.spacings.kilo};
  border-top: 1px solid ${theme.colors.n300};
  color: ${theme.colors.n500};
  text-align: center;
`;

const Content = styled('small')(contentStyles);

const textStyles = ({ theme }) => css`
  display: inline-block;
  font-weight: ${theme.fontWeight.light};
  letter-spacing: 0.5px;

  &::after {
    display: inline-block;
    content: '·';
    padding-right: ${theme.spacings.kilo};
    padding-left: ${theme.spacings.kilo};
  }

  &:last-of-type::after {
    display: none;
  }
`;

const Text = { KILO: 'kilo' };
const StyledText = styled('span')(textStyles);

function Footer({ siteName, siteTwitter }) {
  const currentYear = new Date().getFullYear();
  return (
    <Wrapper>
      <Content>
        <StyledText
          size={Text.KILO}
        >{`© ${currentYear} ${siteName}. All rights reserved.`}</StyledText>
        <StyledText size={Text.KILO}>
          <a
            href={`https://twitter.com${siteTwitter}`}
            title={`Visit @${siteTwitter} profile on Twitter`}
          >
            @{siteTwitter}
          </a>
        </StyledText>
        <StyledText size={Text.KILO}>
          <Link href="/disclaimer">
            <a>Disclaimer</a>
          </Link>
        </StyledText>
      </Content>
    </Wrapper>
  );
}

Footer.propTypes = {
  siteName: PropTypes.string,
  siteTwitter: PropTypes.string
};

Footer.defaultProps = {
  siteName: SITE_NAME,
  siteTwitter: SITE_TWITTER
};

export default Footer;
