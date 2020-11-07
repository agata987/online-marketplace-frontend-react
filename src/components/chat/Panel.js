import React, {useState, useEffect} from 'react'
import { Grid, Menu, Button, Image, Modal } from 'semantic-ui-react'
import Chat from './Chat'
import Hoc from '../Hoc'

const  Panel = props => {

  let chats = []
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (props.fetched) {
      props.chats.map(chat => {
        const participants = chat.participants.map(part => JSON.parse(part)) // string object
        const participant = participants.filter(obj => obj.id !== props.user_id)
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
    
  },[props.newContact, props.fetched])

  const [activeChat, setactiveChat] = useState({
    id: null,
    participantName: null
  })

  const handleOpenChat = (id, participantName) => {
    setactiveChat({id: id, participantName: participantName})
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
            onClick={() => setOpenModal(false)}
            positive
            />
        </Modal.Actions>
    </Modal>
    <Grid>
      <Grid.Column width={4}>
        {props.chats ?
        <Menu fluid vertical tabular>
        {props.chats.map(chat => {
            const participants = chat.participants.map(part => JSON.parse(part)) // string object
            const participant = participants.filter(obj => obj.id !== props.user_id)
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
                />)
          })}
          {chats.length > 0 && activeChat.id === null ? setactiveChat({id: chats[0].chatId, participantName: chats[0].participantName}) : null}
      </Menu>
        : null}
        
      </Grid.Column>

      <Grid.Column width={12}>
        <div>
          {activeChat.id && props.user_id ? <Chat chatId={activeChat.id} userId={props.user_id} participantName={activeChat.participantName}/> : null}
        </div>
      </Grid.Column>
      </Grid>
    </Hoc>
  )

}

export default Panel