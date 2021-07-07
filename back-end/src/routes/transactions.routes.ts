import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';

import Transaction from '../models/Transaction';
import DeleteTransactionService from '../services/DeleteTransactionService';
import UpdateTransactionService from '../services/UpdateTransactionService';

const transactionsRouter = Router();

transactionsRouter.post('/', async (request, response) => {
    const { item_id, item_quantity, type } = request.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
        item_id,
        item_quantity,
        type,
    });

    return response.json(transaction);
});

transactionsRouter.patch('/:id', async (request, response) => {
    const { id } = request.params;
    const { item_id, item_quantity, type } = request.body;

    const updateTransaction = new UpdateTransactionService();

    const transaction = await updateTransaction.execute({
        id,
        item_id,
        item_quantity,
        type,
    });

    return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const deleteTransaction = new DeleteTransactionService();

    await deleteTransaction.execute(id)

    return response.status(204).send();
});


transactionsRouter.get('/', async (request, response) => {
    const transactionsRepository = getRepository(Transaction);
    const transactions = await transactionsRepository.find();

    return response.json(transactions);
});

export default transactionsRouter;
