const defaultState = {
  loading: false,
  errors: null,
  done: false,
};

const createJobOfferReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOADING_':
      return {
        loading: true,
        errors: null,
        done: false,
      };
    case 'DONE_':
      return {
        loading: false,
        errors: null,
        done: true,
      };
    case 'ERRORS_':
      return {
        loading: false,
        errors: action.payload,
        done: false,
      };
    case 'CREATE EDIT RESET_':
      return {
        loading: false,
        errors: null,
        done: false,
      };
    default:
      return state;
  }
};

export default createJobOfferReducer;
