import PropTypes from 'prop-types';
import { Link } from 'components/Link';
import { Image } from 'components/Image';
import { animations, fonts } from '../styles';

const PostCard = ({ post: { title, slug, date, category, image } }) => (
  <Link route="posts" params={{ slug }}>
    <a className="l-w33" title={title}>
      <article>
        <Image
          src={image}
          alt={title}
          className="recipeCard__image"
          width="100%"
          height="100%"
          cover
        />
        <h3>{title}</h3>
        <span>
          {date} {category}
        </span>
      </article>

      <style jsx>{`
        a {
          float: left;
        }

        article {
          display: inline-block;
          position: relative;
          width: 100%;
          margin-top: 0.5rem;
          border-radius: 6px;
          overflow: hidden;
        }

        h3 {
          font-size: ${fonts.size.t2};
          margin-bottom: 0.25rem;
          transition: color ${animations.medium};
          font-weight: ${fonts.weight.bold};
        }
      `}</style>
    </a>
  </Link>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string
  })
};

export { PostCard };
