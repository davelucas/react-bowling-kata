import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import pinsReducer from './lane/pinsReducer';
import gameReducer from './gameReducer';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  const reducers = combineReducers({
    lane: pinsReducer,
    game: gameReducer,
  });

  return createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
      ),
    ),
  );
}
