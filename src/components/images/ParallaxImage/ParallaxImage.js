import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { omit } from 'lodash/fp';
import { sharedPropTypes } from '@sumup/circuit-ui';

import { imagePropType } from '../../../utils/prop-types';
import isServer from '../../../utils/is-server';
import Image from '../Image';

const containerStyles = () => css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 25vh;
`;

const Container = styled('div')(containerStyles);

const imageStyles = () => css`
  position: absolute;
  top: -100%;
  left: 0;
  bottom: -100%;
  right: 0;
  width: 100%;
  height: 300%;
  object-fit: cover;
`;

const StyledImage = styled(Image)(imageStyles);

export default class ParallaxImage extends Component {
  static propTypes = {
    image: PropTypes.shape(imagePropType),
    speed: PropTypes.number,
    theme: sharedPropTypes.themePropType,
    className: PropTypes.string
  };

  static defaultProps = {
    speed: 75,
    theme: {}
  };

  constructor(props) {
    super(props);
    this.containerRef = createRef();

    this.state = {
      translateY: 0
    };
  }

  componentDidMount() {
    if (
      isServer ||
      this.props.theme.reducedMotion ||
      !this.containerRef.current
    ) {
      return;
    }
    this.initIntersectionObserver();
  }

  componentDidUpdate(prevProps) {
    const { reducedMotion } = this.props.theme;
    const prevReducedMotion = prevProps.theme.reducedMotion;

    if (prevReducedMotion && !reducedMotion) {
      this.initIntersectionObserver();
    } else if (!prevReducedMotion && reducedMotion) {
      this.removeIntersectionObserver();
      this.removeScrollListener();
    }
  }

  componentWillUnmount() {
    if (isServer) {
      return;
    }
    this.removeIntersectionObserver();
    this.removeScrollListener();
  }

  initIntersectionObserver = () => {
    this.sectionObserver = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '50px'
    });
    this.sectionObserver.observe(this.containerRef.current);
    this.listeningForIntersection = true;
  };

  removeIntersectionObserver = () => {
    if (this.listeningForIntersection) {
      this.sectionObserver.unobserve(this.containerRef.current);
      this.listeningForIntersection = false;
    }
  };

  handleIntersection = ([{ isIntersecting }]) => {
    if (isIntersecting) {
      this.initScrollListener();
    } else {
      this.removeScrollListener();
    }
  };

  initScrollListener = () => {
    window.addEventListener('scroll', this.debouncedHandleScroll);
    this.listeningForScroll = true;
  };

  removeScrollListener = () => {
    if (this.listeningForScroll) {
      window.removeEventListener('scroll', this.debouncedHandleScroll);
      this.listeningForScroll = false;
    }
  };

  cancelScroll = () => {
    if (this.timeoutScroll) {
      window.cancelAnimationFrame(this.timeoutScroll);
    }
  };

  debouncedHandleScroll = () => {
    this.cancelScroll();
    this.timeoutScroll = window.requestAnimationFrame(this.handleScroll);
  };

  handleScroll = () => {
    // Using both the element and viewport height normalises the speed across
    // different viewport sizes.
    const scrollHeight =
      this.containerRef.current.clientHeight + window.innerHeight;
    const scrollRatio = window.scrollY / scrollHeight;
    const translateY = (scrollRatio * this.props.speed).toFixed(1);

    if (translateY === this.state.translateY) {
      return;
    }

    this.setState({ translateY });
  };

  render() {
    const { className, image } = this.props;
    const { translateY } = this.state;

    if (!image.src) {
      return null;
    }

    return (
      <Container innerRef={this.containerRef} className={className}>
        <StyledImage
          {...omit('toString', image)}
          sizes="100vw"
          style={{ transform: `translate3d(0, ${translateY}%, 0)` }}
        />
      </Container>
    );
  }
}
