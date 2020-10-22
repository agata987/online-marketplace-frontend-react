import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Icon } from 'semantic-ui-react'
import { signUpUser } from '../../redux/actions/userActions'

class RegisterForm extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        errors: ''
    }

    onChange = e => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    onSubmit = e => {
        e.preventDefault()

        // if (toString(username).trim() === '' )
        // if (password === password2) {
        //     this.props.signUpUser(this.state)
        // } else {
        //     this.setState(errors, 'password does not mutch')
        // }
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
                    <Form.Field >
                        <label>Nazwa użytkownika</label>
                        <input 
                            name='username'
                            value={this.state.username}
                            onChange={this.onChange}
                            placeholder='Nazwa użytkownika'
                        />
                    </Form.Field>
                    <Form.Field >
                        <label>Adres e-mail</label>
                        <input 
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder='Adres e-mail'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Hasło</label>
                        <input 
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder='Hasło'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Powtórz hasło</label>
                        <input 
                            type='password'
                            name='password2'
                            value={this.state.password2}
                            onChange={this.onChange}
                            placeholder='Powtórz hasło'
                        />
                    </Form.Field>
                    <Button type='submit' size='large'>Zarejestruj się</Button>
                </Form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        signUpUser: state.signUpUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUpUser: userInfo => dispatch(signUpUser(userInfo))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)