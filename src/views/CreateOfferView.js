import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import OfferForm from '../components/forms/OfferForm';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

const CreateOfferView = (props) => {
  const [redirect, setRedirect] = useState(false);

  const goToMyOffers = () => {
    setRedirect(true);
  };

  return (
    <div>
      <h2>Tworzenie nowego ogłoszenia</h2>
      {redirect ? <Redirect to={'/my-offers'} /> : null}
      {props.user ? (
        <OfferForm redirect={goToMyOffers} user_id={props.user.id} />
      ) : (
        <div className='loader_container'>
          <Loader active inline />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps)(CreateOfferView);
