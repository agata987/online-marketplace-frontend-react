import React from 'react'
import { Input, Form } from 'semantic-ui-react'

class SearchInput extends React.Component {
    render () {
        return(
            <Form onSubmit={this.props.onSubmit} style={{width:'100%'}}>
                <Input
                    onChange={this.props.onChange}
                    placeholder='Szukaj ofert...'
                    size='large'
                    action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'search',
                        content: 'Szukaj',
                      }}
                    style={{maxWidth:'60%', height: '100%'}}
                />
            </Form>
        )
    }
}

export default SearchInput
