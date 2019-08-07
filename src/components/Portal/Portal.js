import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { sharedPropTypes } from '@madebyconnor/bamboo-ui';

class Portal extends Component {
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

Portal.propTypes = {
  selector: PropTypes.string,
  children: sharedPropTypes.childrenPropType
};

/**
 * @component
 */
export default Portal;
