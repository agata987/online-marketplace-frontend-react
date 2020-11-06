import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getUserChats} from '../redux/actions/chatActions'
import Panel from '../components/chat/Panel'
import {Loader, Button, Image, Modal} from 'semantic-ui-react'

const MessagesView = props => {

    const [openModal, setOpenModal] = useState(false)
    const [newContact, setNewContact] = useState(null)

    useEffect(() => {
        if(props.match.params.username) {
            
            setNewContact(props.match.params.username)
            setOpenModal(true)
        }
    }, [])

    useEffect(() => {
        if(props.loggedIn && !props.chats.fetched) {
            props.getUserChats(props.loggedIn.id)
        }
    },[props.loggedIn,])

    return (
        <div>
            <Modal 
                onClose={() => setOpenModal(false)}
                open={openModal}
            >
                <Modal.Header>Chcesz napisać wiadomość do użytkownika <span style={{color: 'green'}}>{newContact}</span>?</Modal.Header>
                <Modal.Content image>
                    <Image size='small' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                    <Modal.Description>   
                        <div style={{fontSize: '2rem', marginBottom: '20px'}}>
                            Czy chcesz dodać użytkownika {newContact} do listy kontaktów?
                        </div>
                        <div style={{fontSize: '1.5rem'}}>
                            Żeby wysłać wiadomość w sprawie ogłoszenia lub oferty pracy dodaj <span style={{color: 'green'}}>{newContact}</span> do kontaktów.
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