import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const LoginInfoModal = props => {
    return(
        <Modal
        basic
        onClose={props.onRequestClose}
        open={props.isOpen}
        size='small'
      >
        <Header icon>
          <Icon name='sign in' />
        </Header>
        <Modal.Content >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {props.text}
            <div style={{marginTop: '20px'}}>
                <Button size='big' color='green' inverted onClick={props.onRequestClose}>
                    <Icon name='checkmark' /> Ok
                </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    )
}

export default LoginInfoModal