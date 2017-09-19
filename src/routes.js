
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import List from './Containers/List'
import Detail from './Containers/Detail'

export default () => {
  const routes = (
    <Route path="/plugin">
      <IndexRoute component={List} />
      <Route path=":title" component={Detail} />
    </Route>
  );
  return routes;
};
