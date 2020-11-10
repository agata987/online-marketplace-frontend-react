import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import {setMessages, addMessage} from '../../redux/actions/chatActions'
import WebSocketInstance from '../../WebSocketInstance'
import {Message, TextArea, Button, Segment} from 'semantic-ui-react'

const Chat = props => {

    const [message, setMessage] = useState('')

    useEffect(() => {
        WebSocketInstance.addCallbacks(
            props.setMessages,
            props.addMessage
        )
    }, [])

    useEffect(() => {
        waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(
                props.userId,
                props.chatId
            )
        })
        WebSocketInstance.connect(props.chatId)
    }, [props.chatId])

    const waitForSocketConnection = callback => {
        setTimeout(() => {
            if (WebSocketInstance.state() === 1)
                callback()
            else waitForSocketConnection(callback)
        }, 100)
    }

    const renderMessages = messages => {
        return messages.map(message => <div style={message.author === props.userId ? {display: 'flex', flexDirection: 'row', justifyContent: 'right', margin: '5px'} : { margin: '5px'}}>
            <Message  color={message.author === props.userId ? 'blue' : null} style={message.author === props.userId ? {width: '45%', textAlign: 'right'} : { width: '45%'}}>
                {message.author !== props.userId ? <Message.Header>{props.participantName}:</Message.Header> :  <Message.Header>ja:</Message.Header>}
                <Message.Content style={{marginTop: '5px', marginBottom: '5px'}}>{message.content}</Message.Content>
                <small>{renderTimestamp(message.timestamp)}</small>
            </Message>
        </div>)
    }

    const renderTimestamp = timestamp => {
        let prefix = "";
        const timeDiff = Math.round(
          (new Date().getTime() - new Date(timestamp).getTime()) / 60000
        );
        if (timeDiff < 1) {
          // less than one minute ago
          prefix = "przed chwilą";
        } else if (timeDiff < 60 && timeDiff > 1) {
          // less than sixty minutes ago
          prefix = `${timeDiff} minuty`;
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
          // less than 24 hours ago
          prefix = `${Math.round(timeDiff / 60)} godziny`;
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
          // less than 7 days ago
          prefix = `${Math.round(timeDiff / (60 * 24))} dni`;
        } else {
          prefix = `${new Date(timestamp)}`;
        }
        return prefix;
      };

    const messageChangeHandler = e => {
        e.persist();
        setMessage(e.target.value)
    }

    const sendMessageHandler = () => {
        if (message.trim() !== ''){
            const messageObject = {
                from: props.userId,
                content: message,
                chatId: props.chatId
            }
            WebSocketInstance.newChatMessage(messageObject)
            setMessage('')
        }
    }


    return(
        <div>
            <Segment style={{overflow: 'auto', height: '550px', backgroundColor: '#cdd9e5'}}>
            {props.messages ? renderMessages(props.messages) : null}
            </Segment>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <TextArea value={message} style={{width: '45%', margin: '0 0 10px auto', padding: '5px'}} placeholder='Wiadomość...' onChange={messageChangeHandler}/>
                <Button onClick={sendMessageHandler} color='orange' style={{width: '45%', marginRight: '0', marginLeft: 'auto'}}>Wyślij</Button>
            </div>
        </div>
    )

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