import React from 'react'
import {connect} from "react-redux";
import {setMessages, addMessage} from '../../redux/actions/chatActions'
import WebSocketInstance from '../../WebSocketInstance'
import { Message } from 'semantic-ui-react'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        WebSocketInstance.addCallbacks(
            this.props.setMessages.bind(this),
            this.props.addMessage.bind(this)
        )
        this.initialiseChat()
    }

    waitForSocketConnection(callback) {
        setTimeout(() => {
            if (WebSocketInstance.state() === 1)
                callback()
            else this.waitForSocketConnection(callback)
        }, 100)
    }

    initialiseChat() {
        this.waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(
                this.props.userId,
                this.props.chatId
            )
        })
        WebSocketInstance.connect(this.props.chatId)
    }

    renderMessages = messages => {
        return messages.map(message => <div style={message.author === this.props.userId ? {display: 'flex', flexDirection: 'row', justifyContent: 'right', margin: '5px'} : { margin: '5px'}}>
            <Message  color={message.author === this.props.userId ? 'teal' : null} style={message.author === this.props.userId ? {width: '45%', textAlign: 'right'} : { width: '45%'}}>
                {message.author !== this.props.userId ? <Message.Header>{this.props.participantName}:</Message.Header> :  <Message.Header>ja:</Message.Header>}
                <Message.Content>{message.content}</Message.Content>
            </Message>
        </div>)
    }

    render() {
        return(
            <div>
                {this.props.messages ? this.renderMessages(this.props.messages) : null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        messages: state.chatReducer.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addMessage(message)),
        setMessages: messages => dispatch(setMessages(messages))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)