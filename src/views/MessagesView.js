import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getUserChats} from '../redux/actions/chatActions'
import Panel from '../components/chat/Panel'
import {Loader} from 'semantic-ui-react'

const MessagesView = props => {
    const [newContact, setNewContact] = useState(null) // user id

    useEffect(() => {
        if(props.loggedIn && !props.chats.fetched) {
            props.getUserChats(props.loggedIn.id)
        }
    },[props.loggedIn,])

    useEffect(() => {
        if(props.match.params.username && props.loggedIn) {
            if(props.loggedIn.username !== props.match.params.username) {
                setNewContact(props.match.params.username)
            }
        }
    }, [])

    return (
        <div>
            {props.loggedIn ? <Panel getUserChats={getUserChats} newContact={newContact} chats={props.chats.chats} fetched={props.chats.fetched} user_id={props.loggedIn.id}/> : 
            <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>
            }
      </div>
    )
}

const mapStateToProps = state => {
    return {
      loggedIn: state.authReducer.user,
      chats: state.chatReducer
    }
}
  

const mapDispatchToProps = dispatch => {
    return {
        getUserChats: user_id => dispatch(getUserChats(user_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MessagesView)