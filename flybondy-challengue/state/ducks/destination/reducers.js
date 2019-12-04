import { SET_POSSIBLE_DESTINATIONS } from "./types";

const initialState = {
  possibleDestination: [],
  origin: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POSSIBLE_DESTINATIONS:
      return {
        ...state,
        possibleDestination: payload.possibleDestinations,
        origin: payload.origin
      };
    default:
      return state;
  }
};
