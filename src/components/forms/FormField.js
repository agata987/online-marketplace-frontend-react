import React from 'react'
import { Form } from 'semantic-ui-react'

export const FormField = props => {

    if (props.fieldError) {
        const err = {
            content: props.content,
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