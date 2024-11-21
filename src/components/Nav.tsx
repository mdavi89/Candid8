import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Portfolio"
          className={currentPage === '/Portfolio' ? 'nav-link active' : 'nav-link'}
        >
          Potential Candidates
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
