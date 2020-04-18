import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    show: false
  };

  toggle = () => {
    this.setState({
      show: !this.state.show
    });
  };

  delete = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { id, name, email, phone, username, website } = this.props.contact;
    const { show } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card card-body mb-3'>
              <h4>
                {name} aka ({username})
                <i className='fas fa-sort-down' onClick={this.toggle} />
                <i
                  className='fas fa-times'
                  onClick={this.delete.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i className='fas fa-pencil-alt' />{' '}
                </Link>
              </h4>
              {show ? (
                <ul className='list-group'>
                  <li className='list-group-item'>Email: {email}</li>
                  <li className='list-group-item'>Phone: {phone}</li>
                  <li className='list-group-item'>Website: {website}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
