import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchCurrentUserData} from './redux/actions/authActions'

import NavBar from './components/NavBar'

import LoginView from './views/authentication/LoginView'
import RegisterView from './views/authentication/RegisterView'
import AccountCreatedView from './views/authentication/AccountCreatedView'
import FavouritesView from './views/FavouritesView'
import JobsView from './views/JobsView'
import MessagesView from './views/MessagesView'
import OffersView from './views/OffersView'
import SettingsView from './views/SettingsView'
import CreateOfferView from './views/CreateOfferView'

import 'semantic-ui-css/semantic.min.css'
import './sass/main.scss'

function App(props) {

  useEffect(() => {
    if (localStorage.getItem('access') && localStorage.getItem('refresh'))
    props.autoLogin()
  }, [])

  return (
    <div>
      <Router>
        <NavBar loggedIn={props.loggedIn}/>
        <Switch>
          <Route path='/login' loggedIn={props.loggedIn} exact component={LoginView} />
          <Route path='/register' exact component={RegisterView} />
          <Route path='/created' exact component={AccountCreatedView} />
          <Route path='/favourites' exact component={FavouritesView} />
          <Route path='/jobs' exact component={JobsView} />
          <Route path='/messages' exact component={MessagesView} />
          <Route path='/' loggedIn={props.loggedIn} exact component={OffersView} />
          <Route path='/settings' exact component={SettingsView} />
          <Route path='/create-offer' exact component={CreateOfferView} />
          <Route />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.tokensFetched,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(fetchCurrentUserData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);