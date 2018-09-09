import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import { ThemeProvider } from 'emotion-theming';
import { injectGlobal } from 'react-emotion';

import { light as theme } from '../src/styles/themes';
import globalStyles from '../src/styles/global-styles';

import { OPTIONS } from './hierarchySeparators';

globalStyles(theme, customStyles);
injectGlobal(`
  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: ${theme.fontFamily.sans} !important;
  }
`);

setDefaults({
  header: false
});

setOptions({
  ...OPTIONS,
  name: "Connor' website",
  url: 'https://connorbaer.co'
});

// Automatically import all files ending in *.story.js
const req = require.context('../src', true, /\.story\.js$/);

const withThemeProvider = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

const withStoryStyles = storyFn => {
  return (
    <div
      id="__next"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      {storyFn()}
    </div>
  );
};

const loadStories = () => {
  addDecorator(withKnobs);
  addDecorator(withStoryStyles);
  addDecorator(withThemeProvider);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);
