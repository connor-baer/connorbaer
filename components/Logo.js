import PropTypes from 'prop-types';
import { Link } from 'components/Link';
import { animations, colors, fonts } from '../styles';

const Logo = ({ siteName, siteUrl, isHome }) => (
  <div>
    <Link href={`${siteUrl}${isHome ? '#' : ''}`} prefetch>
      <a title="Home">{siteName}</a>
    </Link>
    <style jsx>{`
      a {
        padding: 0 1rem;
        font-size: ${fonts.size.t1};
        display: inline-block;
        transition: color ${animations.short};
        color: ${colors.gray[9]};
        font-family: ${fonts.family.sans};
        font-weight: ${fonts.weight.bold};
        line-height: 1;
        vertical-align: middle;
      }

      a:hover,
      a:focus {
        color: ${colors.primary};

        & img {
          transform: scale(1.1);
        }
      }

      img {
        display: inline-block;
        height: 2rem;
        min-height: 36px;
        margin-right: 0.75rem;
        transition: transform ${animations.short};
        vertical-align: middle;
      }
    `}</style>
  </div>
);

Logo.propTypes = {
  siteUrl: PropTypes.string,
  siteName: PropTypes.string,
  isHome: PropTypes.bool
};

export { Logo };
