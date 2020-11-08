import React from 'react'
import {Button, Loader, Image, Modal} from 'semantic-ui-react'
import Hoc from './Hoc'


const OfferView = props => {

    return (

        <Modal
            open={props.isOpen}
            onClose={props.onRequestClose}
            >  
            {props.offer ? <Hoc>
                <Modal.Header>
                    <span>{props.offer.name}</span>       
                </Modal.Header>

                <Modal.Content image>
                    <Image
                        style={{marginBottom: '20px'}}
                        size="large"
                        src={props.offer.image ? props.offer.image : 'https://react.semantic-ui.com/images/wireframe/image.png'}
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
                    <div style={{marginBottom: '5px'}}>
                        <span style={{marginLeft: '5px'}}>
                            <Button onClick={props.onRequestClose}>
                                <Button.Content visible>Zamknij</Button.Content>
                            </Button>
                        </span>
                    </div>
                </Modal.Actions> </Hoc>
            : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}
        </Modal>

    )
}

export default OfferView