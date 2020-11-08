import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import { 
    Button, 
    Modal,
    Loader
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
                {props.offer ? 
                <Hoc>
                    <h1> XD</h1>
                </Hoc>
                : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
            </Modal>
        </Hoc>

    )
}

export default JobOfferView
