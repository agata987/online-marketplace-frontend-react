import React from 'react'
import WebSocketInstance from '../WebSocketHandler'

class ChatView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this), 
                this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(this.props.currentUser)
        })
    }

    componentDidMount() {
        WebSocketInstance.connect()
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    setMessages(messages) {
        this.setState({
            messages: messages.reverse()
        })
    }

    renderTimeStamp = timestamp => {
        const prefix = ''
        const timeDiff = Math.round((new Date().getTime() - new Date(message.timestamp).getTime()) /60000)
        if (timeDiff < 60 && timeDiff > 1) {
            prefix = `${timeDiff} minutes ago`
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
            prefix = `${Math.round(timeDiff/60)} hours ago`
        } else  if (timeDiff < 31*24*60 && timeDiff > 24*60){
            prefix = `${Math.round(timeDiff/(60*24))} days ago`
        } else {
            prefix = `${new Date(timestamp)}`
        }
        return prefix
    }

    renderMessages = messages => {
        return messages.map(message => (
            <li
                key={message.id}
                className={message.author === this.props.currentUser ? 'sent' : 'replies'}
            >
                <img src="http://emilcarlsson.se/assets/mikeross,png" />
                <p>
                    {message.content}
                    <br />
                    <small>
                        { this.renderTimeStamp(message.timestamp) }
                    </small>
                </p>
            </li>
        ))
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }

    waitForSocketConnection(callback) {
        const component = this
        setTimeout(function() {
            if (WebSocketInstance.state() === 1) {
                console.log('connection is secure...')
                callback()
                return
            } else {
                console.log('waiting for connection.....')
                component.waitForSocketConnection(callback)
            }
        }, 100)
    }

    sendMessageHandler = e => {
        e.preventDefault()
        const messageObject = {
            from: this.props.username,
            content: this.state.message
        }
        WebSocketInstance.newChatMessage(messageObject)
        this.setState({
            message: ''
        })
    }

    messageChangeHandler = event => {
        this.setState({
            message: event.target.value
        })
    }

    render() {
        const messages = this.state.messages
        return(
            <div>
                <ul id='chat-log'>
                    {
                        messages &&
                        this.renderMessages(messages)
                    }
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
            </div>
        )
    }
}

export default ChatView