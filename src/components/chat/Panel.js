import React, {useState} from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

const  Panel = props => {

  const chats = []

  const [activeChatId, setactiveChatId] = useState(null)
  const handleOpenChat = id => {
    setactiveChatId(id)
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        {props.chats ?
        <Menu fluid vertical tabular>
        {props.chats.map(chat => {
            const participants = chat.participants.map(part => JSON.parse(part)) // string object
            const participant = participants.filter(obj => obj.id != props.user_id)
            chats.push({
                chatId: chat.id,
                interlocutor: participant[0].id
            })
            return (
                <Menu.Item
                  name={participant[0].username}
                  id={chat.id}
                  active={activeChatId === chat.id}
                  onClick={() => handleOpenChat(chat.id)}
                />)
          })}
          {chats.length > 0 && activeChatId === null ? setactiveChatId(chats[0].chatId) : null}
      </Menu>
        : null}
        
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <Segment>
          WIADOMOSCI
        </Segment>
      </Grid.Column>
    </Grid>
  )

}

export default Panel