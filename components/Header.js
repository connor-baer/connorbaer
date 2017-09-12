import PropTypes from 'prop-types';
import { breakpoints, colors, fonts } from '../styles';

const Header = ({ title, subtitle }) => (
  <section className="l-ctnr">
    <header className="l-w100">
      {title && <h1>{`${title}  `}</h1>}
      {subtitle && <h2>{subtitle}</h2>}
    </header>

    <style jsx>{`
      header {
        max-width: calc(60rem / 4 * 3);
        margin-top: 4rem;
        margin-bottom: 4rem;
      }

      h1 {
        font-size: ${fonts.size.t3};
        font-weight: ${fonts.weight.bold};
        color: ${colors.primary};
      }

      h2 {
        font-size: ${fonts.size.t3};
        color: ${colors.gray[8]};
        font-weight: ${fonts.weight.light};

        @media (max-width: ${breakpoints.medium}) {
          font-size: ${fonts.size.t2};
          margin-top: 0.5rem;
        }
      }

      h1,
      h2 {
        @media (min-width: ${breakpoints.medium}) {
          display: inline;
        }
      }

      .c-header__meta {
        font-size: ${fonts.size.s1};
        display: block;
        margin-top: 0.25rem;
        color: ${colors.gray[6]};
      }

      img {
        height: 12rem;
        font-family: 'object-fit: cover';
        object-fit: cover;
      }

      .c-header__image--split {
        @media (min-width: ${breakpoints.large}) {
          position: fixed;
          top: 0;
          right: 0;
          width: 50vw;

          img {
            height: 100vh;
          }
        }
      }
    `}</style>
  </section>
);

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export { Header };
