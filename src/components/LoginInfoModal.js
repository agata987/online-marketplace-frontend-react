import React from 'react'
import Modal from 'react-modal'
import { Button } from 'semantic-ui-react'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
    }
};

const LoginInfoModal = props => {
    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
        >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Aby utworzyć nową ofertę <a href='/login'>zaloguj się</a>.</h3>
                <Button onClick={props.onRequestClose}>OK</Button>
            </div>
        </Modal>
    )
}

export default LoginInfoModal