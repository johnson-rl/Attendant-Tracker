import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Welcome from './components/welcome'

export default (
  <Route path="/" component={App}>//Will show at all nested routes
    <IndexRoute component={Welcome} /> // Will show only at parent route
    <Route path="users/:id" component={App} />//nested routes are passed to parent as children props
  </Route>
)
