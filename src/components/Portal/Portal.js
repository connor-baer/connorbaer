import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { sharedPropTypes } from '@sumup/circuit-ui';

class Portal extends Component {
  componentDidMount() {
    this.element = document.querySelector(this.props.selector);
    this.forceUpdate();
  }

  render() {
    if (this.element === undefined) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
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
