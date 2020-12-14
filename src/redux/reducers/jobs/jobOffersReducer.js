const defaultState = {
  fetched: false,
};

const jobOffersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_JOB_OFFERS':
      return {
        fetched: true,
        offers: action.payload.results,
        previousPage: action.payload.previous,
        nextPage: action.payload.next,
      };
    case 'RESET_JOB_OFFERS':
      return {
        fetched: false,
      };
    default:
      return state;
  }
};

export default jobOffersReducer;
