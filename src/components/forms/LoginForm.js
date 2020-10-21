import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Message, Icon } from 'semantic-ui-react'
import { fetchUser } from '../../redux/actions/userActions'

class LoginComponent extends React.Component {

    state = {
        username_or_email: '',
        password: ''
    }

    onChange = e => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.fetchUser(this.state)
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <h2>Zaloguj się</h2>
                    { this.props.userReducer.error ? 
                    <Message negative>
                    <p>Niepoprawna nazwa użytkownika/ adres e-mail lub hasło.</p>
                    </Message> 
                    : null }
                    <Form.Field >
                        <label>Nazwa użytkownika / adres e-mail</label>
                        <input 
                            name='username_or_email'
                            value={this.state.username_or_email}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Hasło</label>
                        <input 
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Button type='submit'>Zaloguj się</Button>
                </Form>
                <Message warning>
                <Icon name='arrow alternate circle right' />
                Nie posiadasz konta użytkownika? &nbsp;<a href='#'>Zarejestruj się</a>&nbsp;.
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
        fetchUser: userInfo => dispatch(fetchUser(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)