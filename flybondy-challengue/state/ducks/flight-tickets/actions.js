import { FETCH_FLIGHT_TICKETS } from './types';

export const fetchFlightTickets = payload => ({
  type: FETCH_FLIGHT_TICKETS.REQUEST,
  payload
});
