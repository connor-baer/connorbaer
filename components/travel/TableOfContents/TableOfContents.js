import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { isEmpty } from 'lodash/fp';
import {
  Heading,
  Paragraph,
  Anchor,
  styles,
  useMedia,
} from '@madebyconnor/bamboo-ui';

import Align from '../Align';

const smoothScrollStyles = css`
  html {
    scroll-behavior: smooth;
  }
`;

const detailsStyles = ({ theme }) => css`
  ${theme.mq.hand} {
    margin-top: ${theme.spacing.xs};
  }
`;

const Details = styled(Align)(detailsStyles);

const summaryStyles = ({ theme }) => css`
  ${styles.focusOutline({ theme })}
  margin-top: 0;
  margin-bottom: 0;
  border: none;
  outline: none;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    display: inline-block;
    position: relative;
    content: '+';
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid ${theme.color.bodyColor};
    border-radius: 50%;
    text-align: center;
    line-height: 1;
    margin-right: ${theme.spacing.xs};
    transition: transform ${theme.animation.micro};
  }

  details[open] &::before {
    transform: rotate(45deg);
  }

  ${theme.mq.lap} {
    &::before {
      display: none;
    }
  }
`;

const Summary = styled(Heading)(summaryStyles);

const listStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.m};
`;

const List = styled('ul')(listStyles);

const listItemStyles = ({ theme, depth }) => css`
  list-style-type: none;
  padding-left: calc(${theme.spacing.m} * ${depth - 1});
  margin-bottom: ${theme.spacing.xs};

  &::before {
    content: '\200B';
    position: absolute;
  }
`;

const ListItem = styled(Paragraph)(listItemStyles);

const anchorStyles = ({ theme }) => css`
  color: ${theme.color.neutral[700]};
  font-weight: ${theme.fontWeight.light};
`;

const StyledAnchor = styled(Anchor)(anchorStyles);

function TableOfContents({ title = 'Table of Contents', tableOfContents }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const query = theme.mq.lap.replace('@media ', '');
  useMedia(query, (isMobile) => setOpen(isMobile));

  if (isEmpty(tableOfContents)) {
    return null;
  }

  const handleClick = () => setOpen(!open);

  return (
    <>
      <Global styles={smoothScrollStyles} />

      <Details
        open={open}
        onClick={handleClick}
        align={Align.LEFT}
        as="details"
      >
        <Summary as="summary" size="l">
          {title}
        </Summary>
        <List>
          {tableOfContents.map(({ value, id, depth }) => (
            <ListItem key={id} as="li" size="m" depth={depth} lineHeight="l">
              <StyledAnchor href={`#${id}`}>{value}</StyledAnchor>
            </ListItem>
          ))}
        </List>
      </Details>
    </>
  );
}

TableOfContents.propTypes = {
  title: PropTypes.string,
  tableOfContents: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
};

export default TableOfContents;
