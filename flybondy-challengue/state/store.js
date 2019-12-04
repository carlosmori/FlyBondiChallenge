import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "./middleware/sagas";
import createRootReducer from "./ducks";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  // run the saga
  sagaMiddleware.run(rootSaga);
  return store;
}
/* eslint-enable */
