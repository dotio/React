import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from './context';

// components
import Nav from './components/layout/Nav';
import AllContacts from './components/contacts/AllContacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';

//pages
import About from './components/pages/About';
import NotFound from './components/pages/404';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className='App'>
            <Nav brand='Contact Manager' />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={AllContacts} />
                <Route exact path='/about' component={About} />
                <Route exact path='/contact/add' component={AddContact} />
                <Route exact path='/contact/edit/:id' component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
