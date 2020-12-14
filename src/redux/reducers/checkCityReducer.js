const defaultState = {
  city: null,
};

const checkCityReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        city: action.payload,
      };
    // login or register errors from backend server
    case 'RESET':
      return {
        city: null,
      };
    default:
      return state;
  }
};

export default checkCityReducer;
