import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { Router,createMemoryHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const history = createMemoryHistory(location);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} >
    </Router>
  </Provider>
  , document.querySelector('.containerRoot'));
