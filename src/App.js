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
import MyOffersView from './views/MyOffersView'
import MyJobOffersView from './views/MyJobOffersView'
import EditOfferView from './views/EditOfferView'
import CreateJobOfferView from './views/CreateJobOfferView'
import EditJobOfferView from './views/EditJobOfferView'
import ResetPasswordView from './views/authentication/ResetPasswordView'
import SendResetPasswordView from './views/authentication/SendResetPasswordView'

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
          <Route path='/login' exact component={LoginView} />
          <Route path='/register' exact component={RegisterView} />
          <Route path='/created' exact component={AccountCreatedView} />
          <Route path='/favourites' exact component={FavouritesView} />
          <Route path='/jobs' exact component={JobsView} />
          <Route path='/messages/:username'  component={MessagesView} />
          <Route path='/' exact component={OffersView} />
          <Route path='/settings' exact component={SettingsView} />
          <Route path='/create-offer' exact component={CreateOfferView} />
          <Route path='/messages' exact component={MessagesView} />
          <Route path='/my-offers' exact component={MyOffersView} />
          <Route path='/my-job-offers' exact component={MyJobOffersView} />
          <Route path='/edit-offer/:offerId' component={EditOfferView} />
          <Route path='/edit-joboffer/:offerId' component={EditJobOfferView} />
          <Route path='/create-joboffer' exact component={CreateJobOfferView} />
          <Route path='/reset/:token'  component={ResetPasswordView} />
          <Route path='/send-reset' exact component={SendResetPasswordView} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(fetchCurrentUserData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);