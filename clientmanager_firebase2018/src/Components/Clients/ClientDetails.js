import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import cn from 'classnames';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ClientDetails extends Component {
  state = {
    showBalanceUpd: false,
    balanceUpdAmount: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // delete client
  delete = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(() => history.push('/'));
  };

  // upd balance
  balanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdAmount } = this.state;
    const clientUpdate = {
      balance: parseFloat(balanceUpdAmount)
    };
    // upd in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate);
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpd, balanceUpdAmount } = this.state;

    let balanceForm = '';
    // if balance form should display
    if (showBalanceUpd) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              name='balanceUpdAmount'
              placeholder='Add New Balance'
              value={balanceUpdAmount}
              onChange={this.onChange}
            />
            <div className='input-group-append'>
              <input
                type='submit'
                value='Update'
                className='btn btn-outline-dark'
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <Fragment>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/' className='btn btn-link'>
                <i className='fas fa-arrow-circle-left' /> Back To Dashboard
              </Link>
            </div>
            <div className='col-md-6'>
              <div className='btn-group float-right'>
                <Link to={`/client/edit/${client.id}`} className='btn btn-dark'>
                  {' '}
                  Edit
                </Link>
                <button className='btn btn-danger' onClick={this.delete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className='card'>
            <h3 className='card-header'>
              {client.firstName} {client.lastName}
            </h3>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-8 col-sm-6'>
                  <h4>
                    Client ID:{' '}
                    <span className='text-secondary'>{client.id}</span>
                  </h4>
                </div>
                <div className='col-md-4 col-sm-6'>
                  <h3 className='pull-right'>
                    Balance:{' '}
                    <span
                      className={cn({
                        'text-danger': client.balance <= 0,
                        'text-success': client.balance > 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href='#!'
                        onClick={() =>
                          this.setState({
                            showBalanceUpd: !this.state.showBalanceUpd
                          })
                        }
                      >
                        {' '}
                        <i className='fas fa-pencil-alt' />{' '}
                      </a>
                    </small>
                  </h3>{' '}
                  {/* add form */}
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className='list-group'>
                <li className='list-group-item'>
                  Contact Email: {client.email}
                </li>
                <li className='list-group-item'>
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  // need single client
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]), // what in base
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0] // give single client
  }))
)(ClientDetails);
