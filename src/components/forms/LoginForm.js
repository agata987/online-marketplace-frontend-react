import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {getTokens_fetchCurrentUserData, clearTokens} from '../../redux/actions/authActions'
import {Button, Form, Message, Icon} from 'semantic-ui-react'
import {NegativeMessage} from './NegativeMessage'

const LoginForm = props => {

    // to clear register form errors if user comes back to login form
    useEffect(() => {
        props.clearTokens()
    },[])

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const [showLoginError, setShowLoginError] = useState(false)


    const onChange = e => {
        e.persist();
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        if (loginData.email.trim() !== '' && loginData.password.trim() !== '')
            props.login(loginData)
            
        setShowLoginError(true)
    }

    return(
        <div>
            {props.authReducer.user ?  <Redirect to='' /> : null}
            <Form onSubmit={onSubmit}>
                <h2>Logowanie</h2>
                { props.authReducer.loginErrors ? 
                <NegativeMessage message='Niepoprawny adres e-mail lub hasło.'/>
                : (showLoginError && loginData.email.trim() === '' && loginData.password.trim() === '') ? 
                <NegativeMessage message='Nie podano adresu e-mail ani hasła.'/>
                : showLoginError && loginData.email.trim() === '' ? 
                <NegativeMessage message='Nie adresu e-mail.'/>
                : showLoginError && loginData.password.trim() === '' ?
                <NegativeMessage message='Nie podano hasła.'/>
                : null
                }
                <label>Adres e-mail</label>
                <Form.Field >
                    <input 
                        name='email'
                        value={loginData.email}
                        onChange={onChange}
                        placeholder='Nazwa użytkownika/ adres e-mail'
                    />
                </Form.Field>
                <label>Hasło</label>
                <Form.Field>
                    <input 
                        type='password'
                        name='password'
                        value={loginData.password}
                        onChange={onChange}
                        placeholder='Hasło'
                    />
                </Form.Field>
                <Button type='submit' size='large'>Zaloguj się</Button>
            </Form>
            <Message warning>
            <Icon name='arrow alternate circle right' />
                Nie posiadasz konta użytkownika? &nbsp;<a href='/register'>Zarejestruj się</a>&nbsp;.
            </Message>
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: loginData => dispatch(getTokens_fetchCurrentUserData(loginData)),
        clearTokens: () => dispatch(clearTokens()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)