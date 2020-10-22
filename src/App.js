import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './components/NavBar'

import LoginView from './views/authentication/LoginView'
import RegisterView from './views/authentication/RegisterView'
import FavouritesView from './views/FavouritesView'
import JobsView from './views/JobsView'
import MessagesView from './views/MessagesView'
import OffersView from './views/OffersView'
import SettingsView from './views/SettingsView'

import 'semantic-ui-css/semantic.min.css'
import './sass/main.scss'

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/login' exact component={LoginView} />
          <Route path='/register' exact component={RegisterView} />
          <Route path='/favourites' exact component={FavouritesView} />
          <Route path='/jobs' exact component={JobsView} />
          <Route path='/messages' exact component={MessagesView} />
          <Route path='/' exact component={OffersView} />
          <Route path='/settings' exact component={SettingsView} />
          <Route />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
