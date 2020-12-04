import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';

import Transaction from '../models/Transaction';

const transactionsRouter = Router();

transactionsRouter.post('/', async (request, response) => {
    const { item_id, item_quantity, type } = request.body;
    // const res = request.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
        item_id,
        item_quantity,
        type,
        // res,
    });

    return response.json(transaction);
});

transactionsRouter.get('/', async (request, response) => {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    return response.json(transactions);
});

export default transactionsRouter;
