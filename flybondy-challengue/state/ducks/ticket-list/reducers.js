import { SET_TICKET_LIST } from "./types";

const initialState = {
  ticketList: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TICKET_LIST:
      return {
        ...state,
        ticketList: payload.ticketList
      };
    default:
      return state;
  }
};
