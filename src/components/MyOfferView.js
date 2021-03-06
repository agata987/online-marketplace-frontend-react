import React from 'react';
import { Button, Loader, Image, Modal, Container } from 'semantic-ui-react';
import Hoc from './Hoc';
import EmptyImage from '../resources/empty.svg';

const OfferView = (props) => {
  return (
    <Modal open={props.isOpen} onClose={props.onRequestClose}>
      {props.offer ? (
        <Hoc>
          <Modal.Header>
            <span>{props.offer.name}</span>
          </Modal.Header>
          <Modal.Content image>
            <Image
              style={{ marginBottom: '20px' }}
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
              <Container
                text
                style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                {props.offer.description}
              </Container>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <div className="my_offer_view-actions">
              <span className="my_offer_view-actions-actions-btn">
                <Button onClick={props.onRequestClose}>
                  <Button.Content visible>Zamknij</Button.Content>
                </Button>
              </span>
            </div>
          </Modal.Actions>
        </Hoc>
      ) : (
        <div className="loader_container">
          <Loader active inline />
        </div>
      )}
    </Modal>
  );
};

export default OfferView;
