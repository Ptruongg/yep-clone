import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import businessReducer from './businesses';
import reviewsReducer from './reviews';
import usersReducer from './user';
import bookmarksReducer from './bookmarks';
import searchReducer from './search';

const rootReducer = combineReducers({
  session,
  businessReducer,
  reviewsReducer,
  usersReducer,
  bookmarksReducer,
  searchReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
