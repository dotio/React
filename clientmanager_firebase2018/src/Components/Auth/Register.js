import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from '../Layout/Alert';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
// only connect
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyAction';

class Register extends Component {
  state = {
    email: '',
    password: ''
  };

  // hide reg if click not allow
  componentWillMount() {
    const { allowRegistration, history } = this.props.settings;
    if (!allowRegistration) {
      history.push('/');
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    // register
    firebase
      .createUser({ email, password })
      .catch(err => notifyUser('User is already exist', 'error'));
  };

  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <div className='card'>
            <div className='card-body'>
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className='text-center pb-4 pt-3'>
                <span className='text-primary'>
                  <i className='fas fa-lock' /> Register
                </span>{' '}
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    required
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    required
                    value={password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type='submit'
                  value='Register'
                  className='btn btn-block btn-primary'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
