import { flow } from 'lodash/fp';
import { withRouter } from 'next/router';
import { withTheme } from 'emotion-theming';

import Navigation from './Navigation';

export default flow(
  withRouter,
  withTheme
)(Navigation);
