import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ItemsList from '../pages/ItemsList';
import TransactionsList from '../pages/TransactionsList';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={ItemsList} />
    <Route path="/Estoque" component={ItemsList} />
    <Route path="/Movimentações" component={TransactionsList} />
  </Switch>
);

export default Routes;
