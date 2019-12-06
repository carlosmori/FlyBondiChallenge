/**
 * @module Sagas/Session
 * @desc Session
 */
import { all, put, call, takeLatest, race } from 'redux-saga/effects';
import { axios } from '../../../utils/http/axios-singleton';
import Router from 'next/router';

import { FETCH_FLIGHT_TICKETS } from './types';
export function* fetchFlightTickets(action) {
  try {
    yield put({
      type: FETCH_FLIGHT_TICKETS.LOADING,
      payload: { loading: true }
    });
    const flightTicketsArray = yield call(
      fetchFlightTicketsHttpCall,
      action.payload
    );

    yield race({
      timeout: call(delay, 1500)
    });

    yield put({
      type: FETCH_FLIGHT_TICKETS.SUCCESS,
      payload: { ticketList: flightTicketsArray.data }
    });
    Router.push('/destinations/flight-tickets');
    yield put({
      type: FETCH_FLIGHT_TICKETS.LOADING,
      payload: { loading: false }
    });
  } catch (error) {
    yield put({ type: FETCH_FLIGHT_TICKETS.FAILED, payload: { error } });
    yield put({
      type: FETCH_FLIGHT_TICKETS.LOADING,
      payload: { loading: false }
    });
  }
}

const fetchFlightTicketsHttpCall = payload =>
  axios.post('/flightTickets', payload);

export default function* root() {
  yield all([takeLatest(FETCH_FLIGHT_TICKETS.REQUEST, fetchFlightTickets)]);
}

const delay = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));
