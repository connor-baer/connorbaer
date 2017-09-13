import PropTypes from 'prop-types';
import classNames from 'classnames';
import { breakpoints } from '../styles';

const Main = ({ children, sidebar }) => (
  <main className={classNames({ 'has-sidebar': sidebar })}>
    {children}

    <style jsx>{`
      main {
        min-height: 60vh;
        padding-top: 3.75rem;
      }

      .has-sidebar {
        width: 100vw;

        @media (min-width: ${breakpoints.large}) {
          width: calc(100vw - 20rem);
        }
      }
    `}</style>
  </main>
);

Main.propTypes = {
  sidebar: PropTypes.bool
};

export { Main };
