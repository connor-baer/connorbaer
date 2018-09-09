import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { Grid } from '@sumup/circuit-ui';

import { headingZetta } from '../../styles/style-helpers';
import Link from '../Link';

const wrapperStyles = ({ theme }) => css`
  background-color: ${theme.colors.n100};
  padding-top: ${theme.spacings.zetta};
  padding-bottom: ${theme.spacings.zetta};
  text-align: center;
`;

const Wrapper = styled('footer')(wrapperStyles);

const contentStyles = ({ theme }) => css`
  ${headingZetta({ theme })};
  text-align: center;
  font-weight: ${theme.fontWeight.light};
  color: ${theme.colors.n900};
`;

const Content = styled('p')(contentStyles);

const anchorStyles = ({ theme }) => css`
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.p500};

  &:hover,
  &:focus {
    box-shadow: inset 0 -0.08em 0 0 ${theme.colors.p500};
  }
`;

const Anchor = styled('a')(anchorStyles);

function Prefooter({ text, linkLabel, linkUrl }) {
  const hasLink = linkLabel && linkUrl;
  return (
    <Wrapper>
      <Grid>
        <Content>
          {text && `${text} `}
          {hasLink && (
            <Link href={linkUrl}>
              <Anchor>{linkLabel}</Anchor>
            </Link>
          )}
        </Content>
      </Grid>
    </Wrapper>
  );
}

Prefooter.propTypes = {
  text: PropTypes.string,
  linkLabel: PropTypes.string,
  linkUrl: PropTypes.string
};

/**
 * @component
 */
export default Prefooter;
