import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Grid, Text } from '@sumup/circuit-ui';

import Link from '../Link';

const wrapperStyles = ({ theme }) => css`
  border-top: 1px solid ${theme.colors.n300};
  background-color: ${theme.colors.n100};
  padding-top: ${theme.spacings.mega};
  padding-bottom: ${theme.spacings.mega};
`;

const Wrapper = styled('footer')(wrapperStyles);

const contentStyles = ({ theme }) => css`
  display: block;
  color: ${theme.colors.n500};
  text-align: center;
`;

const Content = styled('small')(contentStyles);

const textStyles = ({ theme }) => css`
  display: inline-block;
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

  a {
    box-shadow: inset 0 -0.08em 0 0 ${theme.colors.n500};

    &:hover,
    &:focus {
      box-shadow: inset 0 -0.08em 0 0 ${theme.colors.p500};
    }
  }
`;

const StyledText = styled(Text)(textStyles);

function Span({ children, ...props }) {
  return (
    <StyledText element="span" size={Text.KILO} noMargin {...props}>
      {children}
    </StyledText>
  );
}

function Footer({ siteName, siteTwitter }) {
  const currentYear = new Date().getFullYear();
  return (
    <Wrapper>
      <Grid>
        <Content>
          <Span>{`© ${currentYear} ${siteName}. All rights reserved.`}</Span>
          {siteTwitter && (
            <Span>
              <a
                href={`https://twitter.com/${siteTwitter}`}
                title={`Visit @${siteTwitter} profile on Twitter`}
              >
                @{siteTwitter}
              </a>
            </Span>
          )}
          <Span>
            <Link href="/legal">
              <a>Legal</a>
            </Link>
          </Span>
        </Content>
      </Grid>
    </Wrapper>
  );
}

Footer.propTypes = {
  siteName: PropTypes.string.isRequired,
  siteTwitter: PropTypes.string.isRequired
};

export default Footer;
