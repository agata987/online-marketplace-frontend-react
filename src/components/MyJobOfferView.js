import React from 'react';
import { Button, Modal, Loader, Container, Image } from 'semantic-ui-react';
import Hoc from './Hoc';
import WorkImage from '../resources/work.svg';

const JobOfferView = (props) => {
  return (
    <Hoc>
      <Modal open={props.isOpen} onClose={props.onRequestClose}>
        {props.offer ? (
          <Hoc>
            <Modal.Header>
              <span>
                {props.offer.name} <small>/ {props.offer.creation_date} </small>{' '}
              </span>
            </Modal.Header>
            <Modal.Content image>
              <Image
                style={{ marginRight: '20px' }}
                size="large"
                src={WorkImage}
                wrapped
              />
              <Modal.Description>
                {props.city ? <h3>Miejsce pracy: {props.city.name}</h3> : null}
                {props.offer.company ? (
                  <h3>Firma: {props.offer.company}</h3>
                ) : null}
                {props.offer.remote ? <h3>Praca zdalna.</h3> : null}
                {props.offer.min_salary ? (
                  <h3>
                    Zarobki: {props.offer.min_salary}
                    {props.offer.max_salary ? (
                      <span> - {props.offer.max_salary}</span>
                    ) : null}{' '}
                    zł
                  </h3>
                ) : null}

                {props.offer.description ? (
                  <hoc>
                    <h3>Opis:</h3>{' '}
                    <Container
                      style={{
                        whiteSpace: 'pre-line',
                        overflowWrap: 'break-word',
                      }}
                      text
                    >
                      {props.offer.description}
                    </Container>
                  </hoc>
                ) : null}
              </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
              <div className="myjob_modal_actions">
                <span className="myjob_modal_actions-btn">
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
    </Hoc>
  );
};

export default JobOfferView;
