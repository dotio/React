import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// components
import AppNavBar from './Components/Layout/AppNavbar';
import Dashboard from './Components/Layout/Dashboard';
import AddClient from './Components/Clients/AddClient';
import ClientDetails from './Components/Clients/ClientDetails';
import EditClient from './Components/Clients/EditClient';
import Settings from './Components/Settings/Settings';

// auth
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './Helpers/auth';

// styles
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <AppNavBar />
            <div className='container'>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path='/client/add'
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path='/client/edit/:id'
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path='/client/:id'
                  component={UserIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path='/settings'
                  component={UserIsAuthenticated(Settings)}
                />
                <Route
                  exact
                  path='/login'
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path='/register'
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
