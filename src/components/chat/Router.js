import React from 'react'
import {Route} from 'react-router-dom'

import Chat from './Chat'
import Hoc from '../Hoc'

const Router = props => (
    <Hoc>
        <Route exact path={props.path} component={Chat} />
    </Hoc>
)

export default Router