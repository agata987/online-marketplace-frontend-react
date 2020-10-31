import React from 'react'
import {connect} from 'react-redux'
import {getTokens, clearTokens} from '../../redux/actions/authActions'
import { Button, Form, Message, Icon } from 'semantic-ui-react'
import { NegativeMessage } from './NegativeMessage'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        // to clear register form errors if user comes back to login form
        this.props.logout()

        this.state = {
            email: '',
            password: '',
            showMessage: false
        }
    }

    onChange = e => {
        e.persist();
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()

        if (this.state.email.trim() !== '' && this.state.password.trim() !== '')
        this.props.login(this.state)
        
        this.setState({showMessage: true})

        this.props.logout()
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <h2>Logowanie</h2>
                    { this.props.authReducer.loginErrors ? 
                    <NegativeMessage message='Niepoprawny adres e-mail lub hasło.'/>
                    : (this.state.showMessage && this.state.email.trim() === '' && this.state.password.trim() === '') ? 
                    <NegativeMessage message='Nie podano adresu e-mail ani hasła.'/>
                    : this.state.showMessage &&  this.state.email.trim() === '' ? 
                    <NegativeMessage message='Nie adresu e-mail.'/>
                    : this.state.showMessage &&  this.state.password.trim() === '' ?
                    <NegativeMessage message='Nie podano hasła.'/>
                    : null
                    }
                    <label>Adres e-mail</label>
                    <Form.Field >
                        <input 
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder='Nazwa użytkownika/ adres e-mail'
                        />
                    </Form.Field>
                    <label>Hasło</label>
                    <Form.Field>
                        <input 
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder='Hasło'
                        />
                    </Form.Field>
                    <Button type='submit' size='large' >Zaloguj się</Button>
                </Form>
                <Message warning>
                <Icon name='arrow alternate circle right' />
                Nie posiadasz konta użytkownika? &nbsp;<a href='/register'>Zarejestruj się</a>&nbsp;.
                </Message>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authReducer: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: loginData => dispatch(getTokens(loginData)),
        logout: () => dispatch(clearTokens())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)