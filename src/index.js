import './styles/sass/style.scss';
import 'cssAnimate';
import 'cssFontAwesome';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


import * as reducers from './reducers'
import { App, Home, About, Contact, Project, Blog } from './components'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})



const store = createStore(
  reducer
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="about" component={About}/>
          <Route path="contact" component={Contact}/>
          <Route path="project" component={Project}/>
          <Route path="blog" component={Blog}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
