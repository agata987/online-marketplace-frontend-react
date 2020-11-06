import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {addMessage, setMessages, getUserChats} from '../redux/actions/chatActions'
import WebSocketInstance from '../WebSocketHandler'

const MessagesView = props => {

    const [loaded, setLoaded] = useState(false)

    const getChats = () => {
        setTimeout(() => {
            if (!props.loggedIn || !props.chats) {
                getChats()
            } else {
                props.getUserChats(props.loggedIn.id)}
                setLoaded(true)
        }, 50)
    }

    useEffect(() => {
        getChats()
        WebSocketInstance.addCallbacks(
            props.setMessages, 
            props.addMessage
        )
    }, [])

    useEffect(() => {
        if ((props.loggedIn || !props.chats) && loaded) {
            props.getUserChats(props.loggedIn.id)
        }
    })

    return (
        <div>
  
      </div>
    )
}

const mapStateToProps = state => {
    return {
      loggedIn: state.authReducer.user,
      chats: state.chatReducer.chats
    }
}
  

const mapDispatchToProps = dispatch => {
    return {
        addMessage: message => dispatch(addMessage(message)),
        setMessages: messages => dispatch(setMessages(messages)),
        getUserChats: user_id => dispatch(getUserChats(user_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MessagesView)