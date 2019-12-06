import { FETCH_FLIGHT_TICKETS } from './types';

const initialState = {
  ticketList: [],
  loading: false,
  error: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FLIGHT_TICKETS.SUCCESS:
      const { ticketList } = payload;
      return {
        ...state,
        ticketList
      };
    case FETCH_FLIGHT_TICKETS.LOADING:
      const { loading } = payload;
      return {
        ...state,
        loading
      };
    case FETCH_FLIGHT_TICKETS.FAILED:
      const { error } = payload;
      return {
        ...state,
        error
      };
    default:
      return state;
  }
};
