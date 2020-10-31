import React from 'react'
import {connect} from 'react-redux'
import {registerUser, clearTokens} from '../../redux/actions/authActions'
import {Button, Form, Icon, Input, Message} from 'semantic-ui-react'
import {FormField} from './FormField'

class RegisterForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
    
            passwords_match: true,
        }
    }

    onChange = e => {
        e.persist();
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {     
        e.preventDefault()

        // to clear the errors
        this.props.clearTokens()

        // password1 == password2
        this.setState({passwords_match: (this.state.password.trim() === this.state.password2.trim())})

        // no empty fields
        if (this.state.passwords_match && this.state.username.trim() !== '' &&  this.state.email.trim() !== '' && this.state.password.trim() !== '')
            this.props.registerUser(this.state)
        
    }

    render() {
        return(
            <div>
                {props.authReducer.user ?  <Redirect to='/created' /> : null}

                <a href='/login'>
                    <button class="ui labeled icon button small">
                        <Icon name='arrow alternate circle left' />
                        Powrót do logowania
                    </button>
                </a>
                

                <h2>Tworzenie nowego konta</h2>

                <Message warning>
                <p><Icon name='exclamation'/>Wszystkie pola muszą być uzupełnione.</p>
                </Message> 
                <Form onSubmit={this.onSubmit}>
                    
                    <label>Nazwa użytkownika</label>
                    <FormField 
                        fieldError={this.props.authReducer.registerErrors ? this.props.authReducer.registerErrors.username ? true : false : false}
                        content={this.props.authReducer.registerErrors ? this.props.authReducer.registerErrors.username ? this.props.authReducer.registerErrors.username : '' : ''}
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
                        fieldError={this.props.authReducer.registerErrors ? this.props.authReducer.registerErrors.email ? true : false : false}
                        content={this.props.authReducer.registerErrors ? this.props.authReducer.registerErrors.email ? this.props.authReducer.registerErrors.email : '' : ''}
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
                        fieldError={this.props.authReducer.registerErrors ? this.props.authReducer.registerErrors.password ? true : false : false}
                        content={this.props.authReducer.registerErrors ? this.props.authReducer.registerErrors.password ? this.props.authReducer.registerErrors.password : '' : ''}
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
                        fieldError={!this.state.passwords_match ? true : this.state.password2_empty ? true : false }
                        content={!this.state.passwords_match ? 'Niepoprawnie powtórzone hasło.' : this.state.password2_empty ? 'To pole nie może być puste.' : ''}
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
        authReducer: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: registerData => dispatch(registerUser(registerData)),
        clearTokens: () => dispatch(clearTokens())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)