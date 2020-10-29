import React from 'react'
import Modal from 'react-modal'
import { Button } from 'semantic-ui-react';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

const CreateOfferModal = props => {
    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
        >
           {props.isLoggedIn ? 
           <div>
               
           </div> :
           <div style={{display: 'flex', alignItems:'center', flexDirection: 'column'}}>
               <h3>Aby utworzyć nową ofertę <a href='/login'>zaloguj się</a>.</h3>
               <Button onClick={props.infoClose}>OK</Button>
           </div>
           }
        </Modal>
    )
}

export default CreateOfferModal