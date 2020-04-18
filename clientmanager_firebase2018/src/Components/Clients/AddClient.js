import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore, history } = this.props;
    if (newClient.balance === '') {
      newClient.balance = 0;
    }
    // submit to fb
    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <Fragment>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-link'>
              <i className='fas fa-arrow-circle-left' /> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>Add Client</div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='firstName'
                  minLength='2'
                  required
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='lastName'
                  minLength='2'
                  required
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email </label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  required
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone </label>
                <input
                  type='phone'
                  className='form-control'
                  name='phone'
                  minLength='2'
                  onChange={this.onChange}
                  value={phone}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='balance'>Balance </label>
                <input
                  type='text'
                  className='form-control'
                  name='balance'
                  onChange={this.onChange}
                  value={balance}
                  disabled={disableBalanceOnAdd}
                />
              </div>
              <input
                type='submit'
                value='Submit'
                className='btn btn-primary btn-block'
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
