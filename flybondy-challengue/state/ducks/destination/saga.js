/**
 * @module Sagas/Session
 * @desc Session
 */
import { all, put, call, takeLatest, race } from 'redux-saga/effects';
import { axios } from '../../../utils/http/axios-singleton';
import Router from 'next/router';

import { FETCH_POSSIBLE_DESTINATIONS } from './types';
export function* fetchPossibleDestinations(action) {
  const { origin } = action.payload;
  try {
    yield put({
      type: FETCH_POSSIBLE_DESTINATIONS.LOADING,
      payload: { loading: true }
    });
    yield race({
      timeout: call(delay, 1500)
    });
    const possibleDestinationsArray = yield call(
      fetchPossibleDestinationsHttpCall,
      origin
    );
    yield put({
      type: FETCH_POSSIBLE_DESTINATIONS.SUCCESS,
      payload: { possibleDestination: possibleDestinationsArray.data, origin }
    });
    Router.push('/destinations');
    yield put({
      type: FETCH_POSSIBLE_DESTINATIONS.LOADING,
      payload: { loading: false }
    });
  } catch (error) {
    yield put({ type: FETCH_POSSIBLE_DESTINATIONS.FAILED, payload: { error } });
    yield put({
      type: FETCH_POSSIBLE_DESTINATIONS.LOADING,
      payload: { loading: false }
    });
  }
}

const fetchPossibleDestinationsHttpCall = origin =>
  axios.get(`/flightTickets/${origin}`);

export default function* root() {
  yield all([
    takeLatest(FETCH_POSSIBLE_DESTINATIONS.REQUEST, fetchPossibleDestinations)
  ]);
}
const delay = ms => new Promise(resolve => setTimeout(() => resolve(true), ms));
