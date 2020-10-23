import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Icon, Input } from 'semantic-ui-react'
import { signUpUser } from '../../redux/actions/userActions'
import { FormField } from './FormField'

class RegisterForm extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        passwords_match: true
    }

    onChange = e => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    onSubmit = e => {
        e.preventDefault()

        if (this.state.password.trim() === this.state.password2.trim()) {
            this.setState(() => ({
                passwords_match: true
            }))
        } else {
            this.setState(() => ({
                passwords_match: false
            }))
        }

        if (this.state.passwords_match) 
            this.props.signUpUser(this.state)

    }

    render() {
        return(
            <div>
                <button class="ui labeled icon button small">
                <Icon name='arrow alternate circle left' />
                    Powrót do logowania
                </button>
                <Form onSubmit={this.onSubmit}>
                    <h2>Tworzenie nowego konta</h2>
                    <label>Nazwa użytkownika</label>
                    <FormField 
                        fieldError={this.props.userReducer.registerErrors ? this.props.userReducer.registerErrors.username ? true : false : false}
                        content={this.props.userReducer.registerErrors ? this.props.userReducer.registerErrors.username ? this.props.userReducer.registerErrors.username : '' : ''}
                        control={Input}
                    >
                        <input 
                            name='username'
                            value={this.state.username}
                            onChange={this.onChange}
                            placeholder='Nazwa użytkownika'
                        />
                    </FormField>
                    <label>Adres e-mail</label>
                    <FormField 
                        fieldError={this.props.userReducer.registerErrors ? this.props.userReducer.registerErrors.email ? true : false : false}
                        content={this.props.userReducer.registerErrors ? this.props.userReducer.registerErrors.email ? this.props.userReducer.registerErrors.email : '' : ''}
                        control={Input}
                    >
                        <input 
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder='Adres e-mail'
                        />
                    </FormField>
                    <label>Hasło</label>
                    <FormField 
                        fieldError={this.props.userReducer.registerErrors ? this.props.userReducer.registerErrors.password ? true : false : false}
                        content={this.props.userReducer.registerErrors ? this.props.userReducer.registerErrors.password ? this.props.userReducer.registerErrors.password : '' : ''}
                        control={Input}
                    >
                        <input
                            type='password' 
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder='Hasło'
                        />
                    </FormField>
                    <label>Powtórz hasło</label>
                    <FormField 
                        fieldError={!this.state.passwords_match ? true : false }
                        content={!this.state.passwords_match ? 'Niepoprawnie powtórzone hasło.' : ''}
                        control={Input}
                    >
                        <input
                            type='password' 
                            name='password2'
                            value={this.state.password2}
                            onChange={this.onChange}
                            placeholder='Powtórz hasło'
                        />
                    </FormField>
                    <Button type='submit' size='large'>Zarejestruj się</Button>
                </Form>
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
        signUpUser: userInfo => dispatch(signUpUser(userInfo))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)