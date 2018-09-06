import { Component } from 'react';
import styled, { css } from 'react-emotion';

import { getAllCookies } from '../utils/cookies';
import { THEMES } from '../constants';

const baseStyles = ({ theme }) => css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
`;

const Wrapper = styled('div')(baseStyles);

export default class Page extends Component {
  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const { toggleTheme, cookies } = this.props;
    return (
      <Wrapper>
        <h1>Hello</h1>
        <button onClick={toggleTheme}>Switch theme</button>
      </Wrapper>
    );
  }
}
