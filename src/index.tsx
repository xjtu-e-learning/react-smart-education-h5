import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './redux/reducers/index';

import mySaga from './redux/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    /* preloadedState, */ composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(mySaga);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();