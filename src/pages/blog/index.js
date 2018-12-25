import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from '@sumup/circuit-ui'

import * as Posts from '../../services/posts'
import { getAllCookies } from '../../services/cookies'

import Meta from '../../components/Meta'
import Header from '../../components/Header'
import PostCard from '../../components/blog/PostCard'

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx)
    return { cookies }
  }

  render() {
    const posts = Posts.load()
    const sortedPosts = Posts.sortByDate(posts)
    const { title = 'Blog' } = this.props
    return (
      <Fragment>
        <Meta title={title} description="" />
        <Grid>
          <Row>
            <Col span={{ default: 12, tera: 10 }}>
              <Header title={title} />
            </Col>
          </Row>
          <Row>
            {sortedPosts.map((post, i) => (
              <Col key={i} span={{ default: 12, kilo: 6, mega: 4 }}>
                <PostCard {...post} />
              </Col>
            ))}
          </Row>
        </Grid>
      </Fragment>
    )
  }
}
