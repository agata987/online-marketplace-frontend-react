import API_Handler from '../../../API_Handler';

const setLoading = () => ({ type: 'LOADING_' });
const setDone = () => ({ type: 'DONE_' });
const setErrors = (payload) => ({ type: 'ERRORS_', payload });
const createEditReset = () => ({ type: 'CREATE EDIT RESET_' });

export const createJobOffer = (jobOfferData) => (dispatch) => {
  dispatch(setLoading());

  API_Handler(true, { method: 'post', url: 'joboffers/', data: jobOfferData })
    .then(() => {
      dispatch(setDone());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const editOffer = (offerId, newOfferData) => (dispatch) => {
  dispatch(setLoading());

  API_Handler(true, {
    method: 'patch',
    url: `joboffers/${offerId}/`,
    data: newOfferData,
  })
    .then(() => {
      dispatch(setDone());
    })
    .catch((err) => dispatch(setErrors(err.response.data)));
};

export const reset = () => (dispatch) => {
  dispatch(createEditReset());
};
