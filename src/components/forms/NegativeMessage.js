import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

export const NegativeMessage = props => {

    return(
        <Message negative>
        <p><Icon name='exclamation'/>{props.message}</p>
        </Message> 
    )
}