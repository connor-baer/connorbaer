import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';
import { format } from 'date-fns';
import { Small } from '@madebyconnor/bamboo-ui';

import { BASE_URL, CATEGORY_PATH } from '../../../constants/paths';
import * as CATEGORIES from '../../../constants/categories';
import Link from '../../Link';

function PostMeta({ date, category, className }) {
  if (!date && !category) {
    return null;
  }

  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const datetime = format(new Date(date), 'yyyy-mm-dd');

  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <div className={className}>
      {date && (
        <Small element="time" dateTime={datetime}>
          {formattedDate}
        </Small>
      )}
      {category && (
        <Small>
          <Link
            as={`${BASE_URL}${CATEGORY_PATH}/${category.slug}`}
            href={{ pathname: CATEGORY_PATH, query: { slug: category.slug } }}
          >
            <a>{category.name}</a>
          </Link>
        </Small>
      )}
    </div>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PostMeta.propTypes = {
  date: PropTypes.string,
  category: PropTypes.oneOf(values(CATEGORIES)),
  className: PropTypes.string
};

/**
 * @component
 */
export default PostMeta;
