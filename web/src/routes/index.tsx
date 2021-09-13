import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ItemsList from '../pages/ItemsList';
import TransactionsList from '../pages/TransactionsList';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={ItemsList} />
    <Route path="/Itens" component={ItemsList} />
    <Route path="/Transações" component={TransactionsList} />
  </Switch>
);

export default Routes;
