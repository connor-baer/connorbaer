import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { values } from 'lodash/fp'
import { Heading } from '@sumup/circuit-ui'

import { BLOG_PATH } from '../../../constants/paths'
import * as CATEGORIES from '../../../constants/categories'

import Link from '../../Link'
import CoverImage from '../../CoverImage'
import PostMeta from '../PostMeta'

const articleStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};
`

const Article = styled('article')(articleStyles)

const headingStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.bit};
`

const StyledHeading = styled(Heading)(headingStyles)

function PostCard({ slug, image, title, date, category }) {
  const { src, srcSet, alt } = image
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <Article>
      <Link href={`${BLOG_PATH}/${slug}`} prefetch>
        <a>
          {src && (
            <CoverImage
              src={src}
              srcSet={srcSet}
              alt={alt}
              aspectRatio={150 / 350}
            />
          )}
          <StyledHeading element="h2" size={Heading.TERA}>
            {title}
          </StyledHeading>
        </a>
      </Link>
      <PostMeta date={date} category={category} />
    </Article>
  )
  /* eslint-enable jsx-a11y/anchor-is-valid */
}

PostCard.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.oneOf(values(CATEGORIES)),
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    alt: PropTypes.string
  })
}

PostCard.defaultProps = {
  image: {}
}

/**
 * @component
 */
export default PostCard
