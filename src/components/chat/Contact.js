import React from 'react'
import {NavLink} from 'react-router-dom'

const Contact = props => (
    <NavLink to={`${props.chatURL}`}>
        <div>
            <p>{props.name}</p>
        </div>
    </NavLink>
)

export default Contact