import { combineReducers } from 'redux';
import destinationReducer from './destination/reducers';
import ticketListReducer from './flight-tickets/reducers';

const createRootReducer = () =>
  combineReducers({
    destinations: destinationReducer,
    ticketList: ticketListReducer
  });
export default createRootReducer;
