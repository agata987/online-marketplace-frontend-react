import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserChats} from '../../redux/actions/chatActions'
import { Grid, Menu, Button, Image, Modal } from 'semantic-ui-react'
import Chat from './Chat'
import Hoc from '../Hoc'
import API_Handler from '../../API_Handler'

const  Panel = props => {

  let chats = []
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (props.chats.fetched) {
      props.chats.chats.map(chat => {
        const participants = chat.participants.map(part => JSON.parse(part)) // string object
        const participant = participants.filter(obj => obj.id !== props.user.id)
        chats.push({
            chatId: chat.id,
            interlocutor: participant[0].id,
            participantName: participant[0].username
        })
      })

      // filter duplicates
      chats = Array.from(new Set(chats.map(chat => chat.chatId)))
      .map(chatId => {
        return chats.find(chat => chat.chatId === chatId)
      })

      if (props.newContact) {
        let exists = false
        chats.forEach(chat => {
          if(chat.participantName === props.newContact) {
            exists = true
          }
        })
        
        if(!exists)
        setOpenModal(true)
      }
    }
    
  },[props.newContact, props.chats.fetched])

  const [activeChat, setactiveChat] = useState({
    id: null,
    participantName: null
  })

  const handleOpenChat = (id, participantName) => {
    setactiveChat({id: id, participantName: participantName})
  }

  const handleCreateChat = () => {
    setOpenModal(false)
    
    const participants = [props.user.id, props.newContact]

    API_Handler(true, {method: 'post', url: 'chat/create/', data: {
      participants: participants
    }})
    .then(() => {
      props.getUserChats(props.user.id)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <Hoc>
      <Modal 
        onClose={() => setOpenModal(false)}
        open={openModal}
    >
        <Modal.Header>Chcesz napisać wiadomość do użytkownika <span style={{color: 'green'}}>{props.newContact}</span>?</Modal.Header>
        <Modal.Content image>
            <Image size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
            <Modal.Description>   
                <div style={{fontSize: '2rem', marginBottom: '20px'}}>
                    Czy chcesz dodać użytkownika {props.newContact} do listy kontaktów?
                </div>
                <div style={{fontSize: '1.5rem'}}>
                    Żeby wysłać wiadomość w sprawie ogłoszenia lub oferty pracy dodaj <span style={{color: 'green'}}>{props.newContact}</span> do kontaktów.
                </div>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => setOpenModal(false)}>
            Nie
            </Button>
            <Button
            content="Tak, dodaj"
            labelPosition='right'
            icon='checkmark'
            onClick={handleCreateChat}
            positive
            />
        </Modal.Actions>
    </Modal>
    <Grid>
      <Grid.Column width={4}>
        {props.chats.chats ?
        <Menu fluid vertical tabular>
        {props.chats.chats.map(chat => {
            const participants = chat.participants.map(part => JSON.parse(part)) // string object
            const participant = participants.filter(obj => obj.id !== props.user.id)
            chats.push({
                chatId: chat.id,
                interlocutor: participant[0].id,
                participantName: participant[0].username
            })
            return (
                <Menu.Item
                  name={participant[0].username}
                  id={chat.id}
                  active={activeChat.id === chat.id}
                  onClick={() => handleOpenChat(chat.id, participant[0].username)}
                  style={{backgroundColor: '#cdd9e5'}}
                />)
          })}
          {chats.length > 0 && activeChat.id === null ? setactiveChat({id: chats[0].chatId, participantName: chats[0].participantName}) : null}
      </Menu>
        : null}
        
      </Grid.Column>

      <Grid.Column width={12}>
        <div>
          {activeChat.id && props.user.id ? <Chat chatId={activeChat.id} userId={props.user.id} participantName={activeChat.participantName}/> : null}
        </div>
      </Grid.Column>
      </Grid>
    </Hoc>
  )

}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    chats: state.chatReducer
  }
}


const mapDispatchToProps = dispatch => {
  return {
      getUserChats: user_id => dispatch(getUserChats(user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)