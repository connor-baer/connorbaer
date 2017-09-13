import PropTypes from 'prop-types';
import { Link } from 'components/Link';
import { colors, fonts } from '../styles';

const Prefooter = ({ text, linkLabel, linkUrl }) => (
  <section className="prefooter">
    <h4>
      {`${text} `}
      <Link href={linkUrl}>
        <a className="link">{linkLabel}</a>
      </Link>
    </h4>
    <style jsx>{`
      section {
        background-color: ${colors.gray[0]};
        padding-top: 3rem;
        padding-bottom: 3rem;
        text-align: center;
      }

      h4 {
        font-size: ${fonts.size.t3};

        & a {
          font-weight: ${fonts.weight.bold};
          color: ${colors.primary};
        }
      }
    `}</style>
  </section>
);

Prefooter.propTypes = {
  text: PropTypes.string,
  linkLabel: PropTypes.string,
  linkUrl: PropTypes.string
};

export { Prefooter };
