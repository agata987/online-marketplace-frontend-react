import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {Button, Loader, Image, Modal, Icon, Container} from 'semantic-ui-react'
import Hoc from './Hoc'
import API_Handler from '../API_Handler'
import LoginInfoModal from './LoginInfoModal'
import EmptyImage from '../resources/empty.svg'


const OfferView = props => {

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

    const addToFavourites = id => {
        alert(`dodawanie do ulubionych oferty o id ${id}`)
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
                {props.offer && userName ? <Hoc>
                    <Modal.Header>
                        <span>{props.offer.name} {userName !== '' ? <small>/ {userName}</small> : null}</span>       
                    </Modal.Header>

                    <Modal.Content image>
                        <Image
                            style={{marginBottom: '20px'}}
                            size="large"
                            src={props.offer.image ? props.offer.image : EmptyImage}
                            wrapped
                        />
                        <Modal.Description>
                            {props.city ? <h3>{props.city.name}</h3> : null}
                            <label>{props.offer.creation_date}</label> 
                            <h3>Cena:</h3>
                            <label>{props.offer.price} zł</label>
                            <h3>Opis:</h3> 
                            <Container text style={{whiteSpace: 'pre-line', overflowWrap: 'break-word'}}>{props.offer.description}</Container>
                        </Modal.Description>
                    </Modal.Content>

                    <Modal.Actions>
                        <div style={{marginBottom: '5px'}}>
                            {!props.favourites && props.offer.id ?
                            <span style={{marginLeft: '5px'}}>
                                <Button onClick={()=>{addToFavourites(props.offer.id)}} color='red' animated>
                                    <Button.Content hidden>Dodaj</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='heart' />
                                    </Button.Content>
                                </Button>
                            </span>
                            : null}
   
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
                    </Modal.Actions> </Hoc>
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

export default connect(mapStateToProps)(OfferView)