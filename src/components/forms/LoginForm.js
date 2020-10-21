import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { fetchUser } from '../../redux/actions/userActions'

class LoginComponent extends React.Component {

    state = {
        username_or_email: '',
        password: ''
    }

    onChange = e => {
        e.persist();
        this.setState(() => ({
            [e.target.name]: e.target.value 
        }))
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.fetchUser(this.state)
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Nazwa użytkownika albo e-mail</label>
                    <input 
                        name='username_or_email'
                        value={this.state.username_or_email}
                        onChange={this.onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Hasło</label>
                    <input 
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                </Form.Field>
                <Button type='submit'>Zaloguj się</Button>
            </Form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: userInfo => dispatch(fetchUser(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(LoginComponent)