import React, {useState} from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import Chat from './Chat'

const  Panel = props => {

  const chats = []

  const [activeChat, setactiveChat] = useState({
    id: null,
    participantName: null
  })
  const handleOpenChat = (id, participantName) => {
    setactiveChat({id: id, participantName: participantName})
  }

  return (
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
  )

}

export default Panel