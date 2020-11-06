import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getUserChats} from '../redux/actions/chatActions'
import Panel from '../components/chat/Panel'
import {Loader} from 'semantic-ui-react'

const MessagesView = props => {

    useEffect(() => {
        if(props.loggedIn && !props.chats.fetched) {
            props.getUserChats(props.loggedIn.id)
        }          
    },[props.loggedIn,])

    return (
        <div>
            {props.loggedIn ? <Panel chats={props.chats} user_id={props.loggedIn.id}/> : 
            <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>
            }
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
        getUserChats: user_id => dispatch(getUserChats(user_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MessagesView)