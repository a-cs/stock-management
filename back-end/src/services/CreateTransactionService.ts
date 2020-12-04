import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Item from '../models/Item';
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
        const itemsRepository = getRepository(Item);
        const transactionsRepository = getRepository(Transaction);

        let {
            total_stock,
        } = await transactionsRepository
            .createQueryBuilder()
            .select('sum(item_quantity) as total_stock')
            .where('item_id= :item_id', { item_id })
            .groupBy('item_id')
            .orderBy('item_id')
            .getRawOne();

        console.log(`total_stock: ${total_stock}, qty: ${item_quantity}`);
        total_stock = +total_stock;
        // total_stock += Number(item_quantity);
        total_stock += item_quantity;

        itemsRepository.update({ id: item_id }, { total_stock });

        const item = await itemsRepository.findOne({
            where: {
                id: item_id,
            },
        });

        // const checkItemExists = await transactionsRepository.findOne({
        //     where: { name },
        // });

        // if (checkItemExists) {
        //     throw new AppError('Item name already used');
        // }
        // const item = { id: item_id };

        const transaction = transactionsRepository.create({
            item,
            item_quantity,
            type,
        });

        await transactionsRepository.save(transaction);

        // transactionsRepository.

        // const test = await transactionsRepository.find({
        //     // where: { item_id },
        //     relations: ['item'],
        // });

        return transaction;
        // return test;
    }
}

export default CreateTransactionService;
