import { Router } from 'express';
import itemsRouter from './items.routes';
import transactionsRouter from './transactions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/transactions', transactionsRouter);
routes.use('/users', usersRouter);

export default routes;
