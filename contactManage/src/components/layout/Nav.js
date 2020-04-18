import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = props => {
  const { brand } = props;
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-0'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          {brand}
        </a>
      </div>
      <div>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              <i className='fas fa-home' /> Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/contact/add' className='nav-link'>
              <i className='fas fa-plus' /> Add
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-link'>
              <i className='fas fa-question' /> About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Nav.defaultProps = {
  brand: 'App ver 2'
};

Nav.propTypes = {
  brand: PropTypes.string.isRequired
};

export default Nav;
