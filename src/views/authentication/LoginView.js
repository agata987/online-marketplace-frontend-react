import React, {useEffect} from 'react'
import { Redirect } from "react-router-dom";
import LoginForm from '../../components/forms/LoginForm'

const LoginView = props => {
    useEffect(() => {
        props.fetchUserData()
    }, [props.loggedIn])

    if (props.loggedIn) 
        return <Redirect to='/' />
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default LoginView