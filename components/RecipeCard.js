import PropTypes from 'prop-types';
import { RecipeMeta } from './RecipeMeta';
import { animations, colors, fonts } from '../styles';

const RecipeCard = ({ recipe: { title, slug, skill, totalTime, image } }) => (
  <a className="l-w33" href={`/food/${slug}`} title={title}>
    <article>
      <figure>
        <img className="o-image" src={image} alt={title} />
      </figure>
      <div>
        <h3>{title}</h3>
        <RecipeMeta totalTime={totalTime} skill={skill} />
      </div>
    </article>

    <style jsx>{`
      a {
        float: left;
      }

      article {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 12rem;
        margin-top: 0.5rem;
        padding: 1rem;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        overflow: hidden;

        &::after {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 8px;
          background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.33));
          content: '';
        }
      }

      div {
        position: absolute;
        bottom: 1rem;
        z-index: 99;
      }

      h3 {
        font-size: ${fonts.size.t2};
        margin-bottom: 0.25rem;
        transition: color ${animations.medium};
        color: ${colors.white};
        font-weight: ${fonts.weight.bold};
      }

      figure {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      img {
        width: 100%;
        height: 100%;
        transition: transform ${animations.long};
        will-change: transform;
        object-fit: cover;
        backface-visibility: hidden;
      }

      a:hover,
      a:focus {
        & img {
          transform: scale(1.04);
        }
      }
    `}</style>
  </a>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    totalTime: PropTypes.number,
    skill: PropTypes.string,
    image: PropTypes.string
  })
};

export { RecipeCard };
