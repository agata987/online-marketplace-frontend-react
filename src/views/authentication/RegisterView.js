import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import RegisterForm from '../../components/forms/RegistrationForm'

class RegisterView extends React.Component {

    render() {
        if (this.props.loggedIn) {
            return <Redirect to='/created' />
        }
        return (
            <div>
                <RegisterForm />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      loggedIn: state.userReducer.loggedIn
    }
}

export default connect(mapStateToProps)(RegisterView)