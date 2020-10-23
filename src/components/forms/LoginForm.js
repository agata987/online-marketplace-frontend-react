import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Message, Icon } from 'semantic-ui-react'
import { fetchUser, logoutUser } from '../../redux/actions/userActions'
import { NegativeMessage } from './NegativeMessage'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        // to clear register form errors if user comes back to login form
        this.props.logoutUser()

        this.state = {
            username_or_email: '',
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

        if (this.state.username_or_email.trim() !== '' && this.state.password.trim() !== '')
        this.props.fetchUser(this.state)
        
        this.setState({showMessage: true})

        this.props.logoutUser()
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <h2>Logowanie</h2>
                    { this.props.userReducer.error ? 
                    <NegativeMessage message='Niepoprawna nazwa użytkownika/ adres e-mail lub hasło.'/>
                    : (this.state.showMessage && this.state.username_or_email.trim() === '' && this.state.password.trim() === '') ? 
                    <NegativeMessage message='Nie podano nazwy użytkownika/ adresu e-mail ani hasła.'/>
                    : this.state.showMessage &&  this.state.username_or_email.trim() === '' ? 
                    <NegativeMessage message='Nie podano nazwy użytkownika ani adresu e-mail.'/>
                    : this.state.showMessage &&  this.state.password.trim() === '' ?
                    <NegativeMessage message='Nie podano hasła.'/>
                    : null
                    }
                    <label>Nazwa użytkownika / adres e-mail</label>
                    <Form.Field >
                        <input 
                            name='username_or_email'
                            value={this.state.username_or_email}
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
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userInfo => dispatch(fetchUser(userInfo)),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)