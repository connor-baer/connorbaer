import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { Router } from '../server/lib/routes';
import { Meta } from 'layouts/Meta';
import { Navigation } from 'components/Navigation';
import { Footer } from 'components/Footer';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: props.sidebar
    };
  }

  render() {
    const { title, site, children } = this.props;
    const { sidebar } = this.state;
    const { name, domain } = site;
    return (
      <div>
        <Meta title={title} />
        <Navigation siteName={name} siteUrl={domain} sidebar={sidebar} />

        {Children.map(children, child =>
          cloneElement(child, { sidebar: this.state.sidebar })
        )}

        <Footer />
      </div>
    );
  }
}

Site.propTypes = {
  title: PropTypes.string,
  site: PropTypes.shape({
    name: PropTypes.string,
    domain: PropTypes.string
  }),
  sidebar: PropTypes.bool,
  index: PropTypes.bool,
  follow: PropTypes.bool
};

export { Site };
