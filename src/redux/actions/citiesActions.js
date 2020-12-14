import API_Handler from '../../API_Handler';

const setCities = (payload) => ({ type: 'SET_CITIES', payload });

// fetch list of voivodeships and cities
export const fetchCities = () => (dispatch) => {
  API_Handler(false, { method: 'get', url: 'voivodeships-cities/' })
    .then((res) => {
      dispatch(setCities(res.data));
    })
    .catch(() => {});
};
