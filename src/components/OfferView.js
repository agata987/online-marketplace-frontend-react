import React from 'react'
import Modal from 'react-modal'
import {Button, Loader, Image} from 'semantic-ui-react'

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

    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
        >   
        { props.offer ?
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1>{props.offer.name}</h1> 
                <Image src={props.offer.image}/>
                {props.city ? <h3>{props.city.name}</h3> : null}
                <label>{props.offer.creation_date}</label> 
                <h3>Cena: {props.offer.price} zł</h3>
                <h3>Opis:</h3> 
                <label>{props.offer.description}</label>
                
                <Button style={{marginTop: '10px'}} onClick={props.onRequestClose}>Zamknij</Button>
            </div>
        : <div style={{width: '100%', padding: '60px', display: 'flex', justifyContent: 'center'}}><Loader active inline /></div>}

        </Modal>
    )
}



export default OfferView