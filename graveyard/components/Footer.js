import PropTypes from 'prop-types';
import { colors, fonts, animations } from '../styles';

const Footer = ({
  siteName = 'Connor Bär',
  siteEmail = 'hello@connorbaer.co'
}) => (
  <footer>
    <small className="l-w100">
      <span>
        {`© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
      </span>·<span>
        {`Email: `}
        <a href="mailto:hello@connorbaer.co" title="Send an email">
          {siteEmail}
        </a>
      </span>·<span>
        <a href="/legal">Legal</a>
      </span>
    </small>
    <style jsx>{`
      footer {
        background-color: ${colors.gray[0]};
      }

      small {
        display: block;
        margin: 0;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-top: 1px solid ${colors.gray[3]};
        color: ${colors.gray[4]};
        font-size: ${fonts.size.s1};
        font-weight: ${fonts.weight.light};
        letter-spacing: 0.5px;
        text-align: center;

        & span {
          display: inline-block;
          padding: 0 0.5em;
        }

        & a {
          transition: color ${animations.short};
          text-decoration: underline;

          &:hover,
          &:focus {
            color: ${colors.primary};
          }
        }
      }
    `}</style>
  </footer>
);

Footer.propTypes = {
  description: PropTypes.string
};

export { Footer };
