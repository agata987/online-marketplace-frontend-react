import React from 'react'
import { Form } from 'semantic-ui-react'

const translateErrors = function(err) {

    const translatons = {
        'Istnieje już user z tą wartością pola username' : 'Ta nazwa użytkownika jest już zajęta',
        'do username': 'do nazwy użytkownika',
        user: "użytkownik",
        password: "hasło",
        '.,': '. ',
        'Istnieje już użytkownik z tą wartością pola email': 'Ten e-mail został już zarejestrowany' 
    }
    
    for(const key in translatons) {
        err = err.toString().replace(key.toString(), translatons[key])
    }
    console.log(`po zamianie: ${err}`)
    return err
}

export const FormField = props => {

    if (props.fieldError) {

        const translatedContent = translateErrors(props.content)

        const err = {
            content: translatedContent,
            pointing: 'below'
        }

        return (
            <Form.Field
            id='form-input-control-error-email'
            error={err}
            control={props.control}
            >
                {props.children}
            </Form.Field>
        )
    } else {
        return <Form.Field>
            {props.children}
        </Form.Field>
    }

}