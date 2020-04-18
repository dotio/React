import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    website: '',
    username: '',
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone, website, username } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }
    if (website === '') {
      this.setState({ errors: { website: 'Website is required' } });
      return;
    }
    if (username === '') {
      this.setState({ errors: { username: 'Username is required' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone,
      website,
      username
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    this.setState({
      name: '',
      email: '',
      phone: '',
      website: '',
      username,
      errors: {}
    });

    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors, website, username } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className='card-header text-center display-4'>
                <span className='text-primary'>Add</span> Contact
              </div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Enter Name...'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Enter Email...'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Enter Phone...'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label='Website'
                    name='website'
                    placeholder='Enter Website...'
                    value={website}
                    onChange={this.onChange}
                    error={errors.website}
                  />
                  <TextInputGroup
                    label='Username'
                    name='username'
                    placeholder='Enter Username...'
                    value={username}
                    onChange={this.onChange}
                    error={errors.username}
                  />
                  <input
                    type='submit'
                    value='Add Contact'
                    className='btn btn-block btn-dark'
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
