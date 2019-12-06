import { all, fork } from 'redux-saga/effects';
// import searchFlightSaga from '../../ducks/search-flight/saga';
import destinationSaga from '../../ducks/destination/saga';
import flightTicketsSaga from '../../ducks/flight-tickets/saga';

export function* rootSaga() {
  yield all([fork(destinationSaga)]);
  yield all([fork(flightTicketsSaga)]);
  // yield all([fork(ticketList)]);
}
