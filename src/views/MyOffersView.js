import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserOffers } from '../redux/actions/offers/userOffersActions';
import MyOffers from '../components/MyOffers';
import { Button } from 'semantic-ui-react';

const MyOffersView = (props) => {
  useEffect(() => {
    if (props.user && !props.offers.offers_fetched)
      props.fetchUserOffers(props.user.id);
  }, [props.user]);

  return (
    <div style={{ marginTop: '20px' }}>
      <a href="/create-offer">
        <Button color="linkedin">Dodaj ofertę</Button>
      </a>
      <h2>Oferty utworzone przez Ciebie: </h2>
      {props.offers.offers_fetched ? (
        <MyOffers items={props.offers.offers} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    offers: state.userOffersReducer,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserOffers: (user_id) => dispatch(fetchUserOffers(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOffersView);
