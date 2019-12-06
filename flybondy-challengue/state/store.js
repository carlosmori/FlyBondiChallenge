import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './middleware/sagas';
import createRootReducer from './ducks';

const sagaMiddleware = createSagaMiddleware();
const configureStore = initialState => {
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
