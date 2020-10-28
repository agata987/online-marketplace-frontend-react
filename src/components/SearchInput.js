import React from 'react'
import { Icon, Input, Form } from 'semantic-ui-react'

class SearchInput extends React.Component {
    render () {
        return(
            <Form onSubmit={this.props.onSubmit}>
                <Input
                    placeholder='Szukaj ofert...'
                    size='large'
                    action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'search',
                        content: 'Szukaj',
                      }}
                />
            </Form>
        )
    }
}

export default SearchInput
