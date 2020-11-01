import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {registerUser, clearTokens} from '../../redux/actions/authActions'
import {Button, Form, Input, Icon} from 'semantic-ui-react'
import {FormField} from './FormField'

const RegisterForm = props => {

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [emptyFields, setEmptyfields] = useState(false)

    const onChange = e => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {     

        // to clear the errors
        props.clearTokens()

        // password1 == password2 ?
        if (registerData.password.trim() === registerData.password2.trim())
            setPasswordsMatch(true)
        else setPasswordsMatch(false)

        // no empty fields
        if (passwordsMatch && registerData.username.trim() !== '' && registerData.email.trim() !== '' && registerData.password.trim() !== '' && registerData.password2.trim() !== '')
            props.registerUser(registerData)
        else setEmptyfields(true)
    }
 
    return(
        <div>
            {props.authReducer.user ? <Redirect to='/created' /> : null}

            <a href='/login'>
                <button class="ui labeled icon button small">
                    <Icon name='arrow alternate circle left' />
                    Powrót do logowania
                </button>
            </a>
            

            <h2>Tworzenie nowego konta</h2>
            <Form onSubmit={onSubmit}>
                
                <label>Nazwa użytkownika</label>
                <FormField 
                    fieldError={props.authReducer.registerErrors ? (props.authReducer.registerErrors.username ? true : false) : emptyFields && registerData.username.trim() === '' ? true : false}
                    content={props.authReducer.registerErrors ? (props.authReducer.registerErrors.username ? props.authReducer.registerErrors.username : '') : emptyFields && registerData.username.trim() === '' ? 'To pole nie może być puste.' : ''}
                    control={Input}
                >
                    <input 
                        name='username'
                        value={registerData.username}
                        onChange={onChange}
                        placeholder='Nazwa użytkownika'
                    />
                </FormField>
                <label>Adres e-mail</label>
                <FormField 
                    fieldError={props.authReducer.registerErrors ? (props.authReducer.registerErrors.email ? true : false) : emptyFields && registerData.email.trim() === '' ? true : false}
                    content={props.authReducer.registerErrors ? (props.authReducer.registerErrors.email ? props.authReducer.registerErrors.email : '') : emptyFields && registerData.email.trim() === '' ? 'To pole nie może być puste.' : ''}
                    control={Input}
                >
                    <input 
                        name='email'
                        value={registerData.email}
                        onChange={onChange}
                        placeholder='Adres e-mail'
                    />
                </FormField>
                <label>Hasło</label>
                <FormField 
                    fieldError={props.authReducer.registerErrors ? (props.authReducer.registerErrors.password ? true : false) : emptyFields && registerData.password.trim() === '' ? true : false}
                    content={props.authReducer.registerErrors ? (props.authReducer.registerErrors.password ? props.authReducer.registerErrors.password : '') : emptyFields && registerData.password.trim() === '' ? 'To pole nie może być puste.' : ''}
                    control={Input}
                >
                    <input
                        type='password' 
                        name='password'
                        value={registerData.password}
                        onChange={onChange}
                        placeholder='Hasło'
                    />
                </FormField>
                <label>Powtórz hasło</label>
                <FormField 
                    fieldError={!passwordsMatch ? true : emptyFields && registerData.password2.trim() === '' ? true : false }
                    content={!passwordsMatch ? 'Niepoprawnie powtórzone hasło.' : emptyFields && registerData.password2.trim() === '' ? 'To pole nie może być puste.' : ''}
                    control={Input}
                >
                    <input
                        type='password' 
                        name='password2'
                        value={registerData.password2}
                        onChange={onChange}
                        placeholder='Powtórz hasło'
                    />
                </FormField>
                <Button type='submit' size='large'>Zarejestruj się</Button>
            </Form>
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
        registerUser: registerData => dispatch(registerUser(registerData)),
        clearTokens: () => dispatch(clearTokens())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)