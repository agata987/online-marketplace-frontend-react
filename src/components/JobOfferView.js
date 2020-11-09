import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import { 
    Button, 
    Modal,
    Loader,
    Icon,
    Container
} from 'semantic-ui-react'
import API_Handler from '../API_Handler'
import LoginInfoModal from './LoginInfoModal'
import Hoc from './Hoc'

const JobOfferView = props => {

    const [userName, setUserName] = useState('')
    const [infoModalOpen, setInfoModalOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (props.offer) {
            if(props.offer.user_id) {
                API_Handler(false, {method: 'get', url: `users/${props.offer.user_id}/`}).
                then(res => {
                  setUserName(res.data.username)
                })
                .catch(() => {})
            }
        }
    },[props.offer])


    const sendMessageHandle = () => {
        if (props.user.id && userName !== '') {
            setRedirect(true)
        } else setInfoModalOpen(true)
    }

    return (
        <Hoc>
            {redirect ?  <Redirect to={`/messages/${userName}`} /> : null}
            <LoginInfoModal 
                onRequestClose={() => {setInfoModalOpen(false)}} 
                isOpen={infoModalOpen} 
                text={<h2>Aby wysłać wiadomość <a href='/login'>zaloguj się</a>.</h2>}>
            </LoginInfoModal>
            <Modal
                open={props.isOpen}
                onClose={props.onRequestClose}
            >
                {props.offer && userName ? 
                <Hoc>
                    <Modal.Header>
                        <span>{props.offer.name} <small>/ {props.offer.creation_date} </small>{userName !== '' ? <small> / {userName}</small> : null}   </span>       
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            {props.city ? <h3>Miejsce pracy: {props.city.name}</h3> : null}
                            {props.offer.company ? <h3>Firma: {props.offer.company}</h3> : null}
                            {props.offer.remote ? <h3>Praca zdalna.</h3>: null}
                            {props.offer.min_salary ? <h3>Zarobki: {props.offer.min_salary}{props.offer.max_salary ? <span> - {props.offer.max_salary}</span> : null} zł</h3> : null}
                            
                            {props.offer.description ? <hoc><h3>Opis:</h3> <Container style={{whiteSpace: 'pre-line'}} text>{props.offer.description}</Container></hoc> : null}
                        </Modal.Description>
                    </Modal.Content>

                    <Modal.Actions>
                        <div style={{marginBottom: '5px'}}>
                            <span style={{marginLeft: '5px'}}>
                                <Button onClick={()=>{}} color='red' animated>
                                    <Button.Content hidden>Dodaj</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='heart' />
                                    </Button.Content>
                                </Button>
                            </span>
                            <span style={{marginLeft: '5px'}}>
                                <Button onClick={sendMessageHandle} color='blue'  animated>
                                    <Button.Content visible>Wiadomość</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </span>
                            <span style={{marginLeft: '5px'}}>
                                <Button onClick={props.onRequestClose}>
                                    <Button.Content visible>Zamknij</Button.Content>
                                </Button>
                            </span>
                        </div>
                    </Modal.Actions>
                </Hoc>
                : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
            </Modal>
        </Hoc>

    )
}

const mapStateToProps = state => {
    return {
      user: state.authReducer.user,
    }
}


export default connect(mapStateToProps)(JobOfferView)
