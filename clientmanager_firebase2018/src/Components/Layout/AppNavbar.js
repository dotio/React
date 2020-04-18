import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { compose } from 'redux';

// need to connect
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
  state = {
    isAuth: false
  };

  // to auth
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }

  onLogout = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuth } = this.state;
    const { auth } = this.props;
    const {allowRegistration} = this.props.settings

    return (
      <nav className='navbar navbar-expand-md navbar-dark mb-4'>
        <div className='container'>
          <Link to='/' className='navbar-brand'>
            ClientPanel
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarMain'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarMain'>
            <ul className='navbar-nav mr-auto'>
              {isAuth ? (
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuth ? (
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <a href='#!' className='nav-link'>
                    {auth.email}
                  </a>
                </li>
                <li className='nav-item'>
                  <Link to='/settings' className='nav-link'>
                    <i className='fas fa-cog' />
                  </Link>
                </li>
                <li className='nav-item'>
                  <a href='#!' className='nav-link' onClick={this.onLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}
            {allowRegistration && !isAuth ? (
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>Register</Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
