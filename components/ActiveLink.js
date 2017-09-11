import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';

const ActiveLink = ({ label, href, as, className = '', router }) => {
  const isActive = router.pathname === href;
  return (
    <Link href={href} as={as}>
      <a className={`${className} ${isActive && 'active'}`}>{label}</a>
    </Link>
  );
};

ActiveLink.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  router: PropTypes.object
};

const a = withRouter(ActiveLink);

export { a as ActiveLink };
