import React from 'react'
import {connect} from "react-redux";
import {setMessages, addMessage} from '../../redux/actions/chatActions'
import WebSocketInstance from '../../WebSocketInstance'
import {Message, TextArea, Button, Segment} from 'semantic-ui-react'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }

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
                <Message.Content style={{marginTop: '5px', marginBottom: '5px'}}>{message.content}</Message.Content>
                <small>{this.renderTimestamp(message.timestamp)}</small>
            </Message>
        </div>)
    }

    renderTimestamp = timestamp => {
        let prefix = "";
        const timeDiff = Math.round(
          (new Date().getTime() - new Date(timestamp).getTime()) / 60000
        );
        if (timeDiff < 1) {
          // less than one minute ago
          prefix = "just now...";
        } else if (timeDiff < 60 && timeDiff > 1) {
          // less than sixty minutes ago
          prefix = `${timeDiff} minutes ago`;
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
          // less than 24 hours ago
          prefix = `${Math.round(timeDiff / 60)} hours ago`;
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
          // less than 7 days ago
          prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
        } else {
          prefix = `${new Date(timestamp)}`;
        }
        return prefix;
      };

    messageChangeHandler = e => {
        e.persist();
        this.setState({message: e.target.value})
    }

    sendMessageHandler = () => {
        if (this.state.message.trim() !== ''){
            const messageObject = {
                from: this.props.userId,
                content: this.state.message,
                chatId: this.props.chatId
            }
            WebSocketInstance.newChatMessage(messageObject)
            this.setState({message: ''})
        }
    }

    render() {

        return(
            <div>
                <Segment style={{overflow: 'auto', height: '550px'}}>
                {this.props.messages ? this.renderMessages(this.props.messages) : null}
                </Segment>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextArea value={this.state.message} style={{width: '45%', margin: '0 0 10px auto', padding: '5px'}} placeholder='Wiadomość...' onChange={this.messageChangeHandler}/>
                    <Button onClick={this.sendMessageHandler} color='teal' style={{width: '45%', marginRight: '0', marginLeft: 'auto'}}>Wyślij</Button>
                </div>
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