import { Router } from 'express';
import itemsRouter from './items.routes';
import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
