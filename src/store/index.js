import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import middleware from "../redux/middlewares";
import rootReducer from '../redux/reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const filtersMiddleware = [
    process.env.NODE_ENV !== 'production' && createLogger(),
    thunk,
    middleware
].filter(Boolean);

const composedMiddlewares = composeEnhancers(
    applyMiddleware(...filtersMiddleware)
);

const store = initialState => {
    return createStore(rootReducer, initialState, composedMiddlewares);
};
export default store;
