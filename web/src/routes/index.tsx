import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ItemsList from '../pages/ItemsList';
import CategoriesList from '../pages/CategoriesList';
import TransactionsList from '../pages/TransactionsList';
import UsersList from '../pages/UsersList';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/Criar-conta" component={SignUp} />
    <Route path="/Estoque" component={ItemsList} isPrivate />
    <Route path="/Categorias" component={CategoriesList} isPrivate />
    <Route path="/Movimentações" component={TransactionsList} isPrivate />
    <Route path="/Admin" component={UsersList} isPrivate />
  </Switch>
);

export default Routes;
