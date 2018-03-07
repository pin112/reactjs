import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

const middleware = composeWithDevTools(applyMiddleware(promise(), thunk, routerMiddleware(hashHistory)));

const store = createStore(
  reducers,
  middleware
);

const history = syncHistoryWithStore(hashHistory, store);

function scrollToTop() {
  window.scrollTo(0, 0);
}

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('./containers/App'),
    indexRoute: { onEnter: (nextState, replace) => replace('/app/dashboard') },
    childRoutes: [
      require('./routes/app'),
      require('./routes/404'),
      require('./routes/500'),
      require('./routes/confirmEmail'),
      require('./routes/forgotPassword'),
      require('./routes/lockScreen'),
      require('./routes/login'),
      require('./routes/signUp'),
      require('./routes/register'),
      require('./routes/fullscreen'),
      {
        path: '*',
        indexRoute: { onEnter: (nextState, replace) => replace('/404') },
      }
    ]
  }]
};

render(
  <Provider store={store}>
    <Router
      onUpdate={scrollToTop}
      history={history}
      routes={rootRoute}
    />
  </Provider>,
  document.getElementById('app-container')
);
