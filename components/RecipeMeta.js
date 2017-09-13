import PropTypes from 'prop-types';
import { Svg } from 'components/Svg';
import { colors, fonts } from '../styles';

const RecipeMeta = ({ totalTime, skill, light = false }) => {
  const fill = light ? colors.white : colors.gray[6];
  return (
    <div className={light ? 'light' : 'dark'}>
      {totalTime && (
        <p>
          <Svg sprite="food" name="clock" width="18" height="18" fill={fill} />
          <span>{`${totalTime} mins`}</span>
        </p>
      )}
      {skill && (
        <p>
          <Svg sprite="food" name="chef" width="18" height="18" fill={fill} />
          <span>{skill}</span>
        </p>
      )}
      <style jsx>{`
        p {
          font-size: ${fonts.size.s1};
          display: inline-block;
          margin-right: 0.5rem;
        }

        span {
          margin-left: 0.25rem;
        }

        .dark {
          & span {
            color: ${colors.gray[6]};
          }
        }

        .light {
          & span {
            color: ${colors.white};
          }
        }
      `}</style>
    </div>
  );
};

RecipeMeta.propTypes = {
  totalTime: PropTypes.string,
  skill: PropTypes.string,
  light: PropTypes.bool
};

export { RecipeMeta };
