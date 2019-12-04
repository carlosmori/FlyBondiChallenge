import { combineReducers } from "redux";
import destinationReducer from "./destination/reducers";
import ticketListReducer from "./ticket-list/reducers";

const createRootReducer = () =>
  combineReducers({
    destinations: destinationReducer,
    ticketList: ticketListReducer
  });
export default createRootReducer;
