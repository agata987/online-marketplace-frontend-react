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
            label={props.label}
            >
                {props.children}
            </Form.Field>
        )
    } else {
        return <Form.Field>
            <label>{props.label}</label>
            {props.children}
        </Form.Field>
    }

}