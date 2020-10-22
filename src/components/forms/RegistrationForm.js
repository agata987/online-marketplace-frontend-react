import React from 'react'
import { Button, Form} from 'semantic-ui-react'

class RegisterForm extends React.Component {

    render() {
        return(
            <div>
                <Form>
                    <h2>Tworzenie nowego konta</h2>
                    <Form.Field >
                        <label>Nazwa użytkownika / adres e-mail</label>
                        <input 
                            name='username_or_email'
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Hasło</label>
                        <input 
                            type='password'
                            name='password'
                        />
                    </Form.Field>
                    <Button type='submit'>Zarejestruj się</Button>
                </Form>
            </div>
        )
    }
}



export default RegisterForm