import PropTypes from 'prop-types';
import { Link } from 'components/Link';
import { Image } from 'components/Image';
import { RecipeMeta } from 'components/RecipeMeta';
import { animations, colors, fonts } from '../styles';

const RecipeDirections = ({ directions }) => (
  <ul className="c-recipe__directions">
    {directions.map((direction, i) => (
      <li className="c-recipe__direction" key={i}>
        {direction}
      </li>
    ))}

    <style jsx>{`
      ul {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding-left: 2rem;
        counter-reset: descriptions;
      }

      li {
        font-size: ${fonts.size.s0};
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;

        &::before {
          font-size: ${fonts.size.t4};
          position: absolute;
          top: 0;
          left: -2rem;
          font-weight: ${fonts.weight.bold};
          content: counter(descriptions);
          counter-increment: descriptions;
        }
      }
    `}</style>
  </ul>
);

RecipeDirections.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    totalTime: PropTypes.string,
    skill: PropTypes.string,
    image: PropTypes.string
  })
};

export { RecipeDirections };
