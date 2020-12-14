import API_Handler from '../../../API_Handler';

const setJobCategories = (payload) => ({ type: 'SET_JOB_CATEGORIES', payload });

export const fetchJobCategories = () => (dispatch) => {
  API_Handler(false, { method: 'get', url: 'joboffers/categories/' })
    .then((res) => {
      dispatch(setJobCategories(res.data));
    })
    .catch(() => {});
};
