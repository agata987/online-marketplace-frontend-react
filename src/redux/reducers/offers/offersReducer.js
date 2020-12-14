const defaultState = {
  offers_fetched: false,
};

const offersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return {
        offers_fetched: true,
        offers: action.payload.results,
        previousPage: action.payload.previous,
        nextPage: action.payload.next,
      };
    case 'RESET':
      return {
        offers_fetched: false,
      };
    default:
      return state;
  }
};

export default offersReducer;
