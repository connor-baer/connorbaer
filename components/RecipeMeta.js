import PropTypes from 'prop-types';
import { Svg } from 'components/Svg';
import { colors, fonts } from '../styles';

const RecipeMeta = ({ totalTime, skill }) => (
  <div>
    <p>
      <Svg sprite="food" name="clock" width="24" height="24" />
      <span>{`${totalTime} mins`}</span>
    </p>
    <p>
      <Svg sprite="food" name="chef" width="24" height="24" />
      <span>{skill}</span>
    </p>
    <style jsx>{`
      p {
        font-size: ${fonts.size.s1};
        display: inline-block;
      }

      span {
        color: ${colors.white};
      }
    `}</style>
  </div>
);

RecipeMeta.propTypes = {
  totalTime: PropTypes.string,
  skill: PropTypes.string
};

export { RecipeMeta };
