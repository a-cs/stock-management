import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

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

interface QueryResult {
    total_stock: number;
}

class CreateTransactionService {
    public async execute({
        item_id,
        item_quantity,
        type,
    }: Request): Promise<Transaction> {
        const itemsRepository = getRepository(Item);
        const transactionsRepository = getRepository(Transaction);

        const checkItemExists = await itemsRepository.findOne({
            where: { id:item_id },
        });

        if (!checkItemExists) {
            throw new AppError('Item not found');
        }

        let query:QueryResult = await transactionsRepository
            .createQueryBuilder()
            .select('sum(item_quantity) as total_stock')
            .where('item_id= :item_id', { item_id })
            .groupBy('item_id')
            .orderBy('item_id')
            .getRawOne();


        if(!query){
            query = {total_stock:0}
        }

        let {total_stock} = query

        console.log(`item_id: ${item_id} total_stock: ${total_stock}, qty: ${item_quantity}`);
        total_stock = +total_stock;
        total_stock += item_quantity;

        await itemsRepository.update({ id: item_id }, { total_stock });

        const item = await itemsRepository.findOne({
            where: {
                id: item_id,
            },
        });



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
