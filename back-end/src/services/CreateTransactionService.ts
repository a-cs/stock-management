import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';

// import Item from '../models/Item';
import Transaction from '../models/Transaction';

interface Request {
    item_id: number;
    item_quantity: number;
    type: 'in' | 'out';
    // user_id: string;
    // user_name: string;
    // res: object;
}

class CreateTransactionService {
    public async execute({
        item_id,
        item_quantity,
        type,
    }: Request): Promise<Transaction> {
        // const itemsRepository = getRepository(Item);

        // const item = await itemsRepository.findOne({
        //     where: {
        //         id: item_id,
        //     },
        // });
        const transactionsRepository = getRepository(Transaction);

        // const checkItemExists = await transactionsRepository.findOne({
        //     where: { name },
        // });

        // if (checkItemExists) {
        //     throw new AppError('Item name already used');
        // }
        const item = { id: item_id };

        const transaction = transactionsRepository.create({
            item,
            item_quantity,
            type,
        });

        await transactionsRepository.save(transaction);

        return transaction;
    }
}

export default CreateTransactionService;
