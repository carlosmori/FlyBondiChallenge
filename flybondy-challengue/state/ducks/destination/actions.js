import { FETCH_POSSIBLE_DESTINATIONS } from './types';

// export const setPossibleDestinations = payload => ({
//   type: FETCH_POSSIBLE_DESTINATIONS.REQUEST,
//   payload
// });

export const fetchPossibleDestination = payload => ({
  type: FETCH_POSSIBLE_DESTINATIONS.REQUEST,
  payload
});
