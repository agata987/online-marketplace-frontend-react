const defaultState = {
  fetched: false,
  offers: null,
};

const favouritesOffersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_FAVOURITES_OFFERS':
      return {
        fetched: true,
        offers: action.payload,
      };
    case 'RESET_FAVOURITES_OFFERS':
      return {
        fetched: false,
        offers: null,
      };
    default:
      return state;
  }
};

export default favouritesOffersReducer;
