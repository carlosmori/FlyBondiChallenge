import { FETCH_POSSIBLE_DESTINATIONS } from './types';

const initialState = {
  possibleDestination: [],
  origin: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_POSSIBLE_DESTINATIONS.SUCCESS:
      const { origin, possibleDestination } = payload;
      return {
        ...state,
        possibleDestination,
        origin
      };
    case FETCH_POSSIBLE_DESTINATIONS.LOADING:
      const { loading } = payload;
      return {
        ...state,
        loading
      };

    default:
      return state;
  }
};
