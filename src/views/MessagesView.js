import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {addMessage, setMessages, getUserChats} from '../redux/actions/chatActions'
import WebSocketInstance from '../WebSocketHandler'
import Panel from '../components/chat/Panel'

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

    const socketHandler = WebSocketInstance.addCallbacks(
        props.setMessages, 
        props.addMessage
    )

    useEffect(() => {
        getChats()
    }, [])

    useEffect(() => {
        if ((props.loggedIn || !props.chats) && loaded) {
            props.getUserChats(props.loggedIn.id)
        }
    })

    const [activeChat, setActiveChat] = useState(null)

    return (
        <div>
            <Panel />
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