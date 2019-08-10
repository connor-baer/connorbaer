import React from 'react';
import PropTypes from 'prop-types';
import { toLower } from 'lodash/fp';
import { format } from 'date-fns';
import { Small } from '@madebyconnor/bamboo-ui';

import { CATEGORY_PATH } from '../../../constants/paths';
import Link from '../../Link';

export default function PostMeta({ date, category, className }) {
  if (!date && !category) {
    return null;
  }

  const formattedDate = format(new Date(date), 'MMMM d, yyyy');
  const datetime = format(new Date(date), 'yyyy-mm-dd');
  const categorySlug = toLower(category);

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
            as={`${CATEGORY_PATH}/${categorySlug}`}
            href={{ pathname: CATEGORY_PATH, query: { category } }}
          >
            <a>{category}</a>
          </Link>
        </Small>
      )}
    </div>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PostMeta.propTypes = {
  date: PropTypes.string,
  category: PropTypes.string,
  className: PropTypes.string
};
