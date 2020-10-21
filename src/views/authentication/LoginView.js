import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import LoginForm from '../../components/forms/LoginForm'

class LoginView extends React.Component {

    render() {
        if (this.props.loggedIn) {
            return <Redirect to='' />
        }
        return (
            <div>
                 <LoginForm />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      loggedIn: state.userReducer.loggedIn
    }
}

export default connect(mapStateToProps)(LoginView)