import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ItemsList from '../pages/ItemsList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={ItemsList} />
  </Switch>
);

export default Routes;
