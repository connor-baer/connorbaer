import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { propTypes } from '@madebyconnor/bamboo-ui';

export default class Portal extends Component {
  static propTypes = {
    selector: PropTypes.string,
    children: propTypes.childrenPropType,
  };

  componentDidMount() {
    this.element = document.querySelector(this.props.selector);
    this.forceUpdate();
  }

  render() {
    if (this.element === undefined) {
      return null;
    }

    return createPortal(this.props.children, this.element);
  }
}
