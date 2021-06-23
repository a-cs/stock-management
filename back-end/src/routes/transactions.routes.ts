import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateTransactionService from '../services/CreateTransactionService';

import Transaction from '../models/Transaction';
import DeleteTransactionService from '../services/DeleteTransactionService';

const transactionsRouter = Router();

transactionsRouter.post('/', async (request, response) => {
    const { item_id, item_quantity, type } = request.body;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
        item_id,
        item_quantity,
        type,
        // res,
    });

    return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
    console.log("entrou")
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
