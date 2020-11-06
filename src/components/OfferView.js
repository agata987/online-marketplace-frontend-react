import React from 'react'
import {Button, Loader, Image, Modal, Icon} from 'semantic-ui-react'
import Hoc from './Hoc'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      minWidth              : '40%',
    }
};

const OfferView = props => {
    return (
        <Modal
            open={props.isOpen}
            onClose={props.onRequestClose}
            >  
            {props.offer ? <Hoc>
                <Modal.Header>{props.offer.name}</Modal.Header>

                <Modal.Content image>
                    <Image
                        size="large"
                        src={props.offer.image}
                        wrapped
                    />
                    <Modal.Description>
                        {props.city ? <h3>{props.city.name}</h3> : null}
                        <label>{props.offer.creation_date}</label> 
                        <h3>Cena:</h3>
                        <label>{props.offer.price} zł</label>
                        <h3>Opis:</h3> 
                        <label>{props.offer.description}</label>
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    
                    <Button onClick={() => {}} color='green' animated>
                    <Button.Content visible>Wiadomość</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                    </Button>
                    <Button onClick={props.onRequestClose}>
                        Zamknij
                    </Button>
                </Modal.Actions> </Hoc>
            : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>
    }
        </Modal>)
}



export default OfferView