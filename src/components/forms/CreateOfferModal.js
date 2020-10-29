import React from 'react'
import Modal from 'react-modal'
import { Button, Form, Icon, Input, Message, TextArea } from 'semantic-ui-react'
import { FormField } from './FormField'
import CityMenu from '../CityMenu'

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

const CreateOfferModal = props => {
    return(
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
        >
           {props.isLoggedIn ? 
           <div>
               <h3>Tworzenie nowej oferty</h3>
                <label>Tytuł ogłoszenia</label>
                <FormField>
                    <input
                        name='name'
                        placeholder='Tytuł ogłoszenia'
                    />
                </FormField>
                <label>Miasto</label>
                <FormField>
                    <CityMenu />
                </FormField>
                <label>Kategoria</label>
                <FormField>
                    
                </FormField>
                <label>Cena</label>
                <FormField>
                    <input
                        name='price'
                        placeholder='Cena'
                    />
                </FormField>
                <label>Opis</label>
                <FormField>
                    <TextArea />
                </FormField>
                <Button>Dodaj</Button>
                <Button>Anuluj</Button>
               
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