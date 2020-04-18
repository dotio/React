import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import cn from 'classnames';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Clients extends Component {
  state = {
    totalOwed: null
  };

  // receive all clients balance
  static getDerivedStateFromProps(props, state) {
    // get clients
    const { clients } = props;
    if (clients) {
      // add balance
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <Fragment>
          <div className='row'>
            <div className='col-md-6'>
              <h2>
                <i className='fas fa-users' /> Clients
              </h2>
            </div>
            <div className='col-md-6'>
              <h5 className='text-right text-secondary'>
                Total Owed:{' '}
                <span className='text-primary'>
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className='table table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>
                    <span
                      className={cn({
                        'text-danger': client.balance <= 0,
                        'text-success': client.balance > 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className='btn btn-secondary btn-sm btn-block'
                    >
                      {' '}
                      <i className='fas fa-arrow-circle-right' /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  clients: PropTypes.array,
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]), // what in base
  connect((state, props) => ({
    clients: state.firestore.ordered.clients // get from firestore and put in clients
  }))
)(Clients);
