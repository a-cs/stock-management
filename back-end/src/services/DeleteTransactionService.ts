import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Item from '../models/Item';
import Transaction from '../models/Transaction';



interface QueryResult {
    total_stock: number;
}

class DeleteTransactionService {
    public async execute(
        id: string
    ): Promise<void> {
        const itemsRepository = getRepository(Item);
        const transactionsRepository = getRepository(Transaction);

        const transaction = await transactionsRepository.findOne(id)

        if (!transaction) {
            throw new AppError(`Transaction id ${id} does not exist`);
        }

        const item_id = transaction.item.id

        let query: QueryResult = await transactionsRepository
            .createQueryBuilder()
            .select('sum(item_quantity) as total_stock')
            .where('item_id= :item_id', { item_id })
            .groupBy('item_id')
            .orderBy('item_id')
            .getRawOne();

        let { total_stock } = query

        console.log(`item_id: ${item_id} total_stock: ${total_stock}, qty: ${transaction.item_quantity}`);
        total_stock = Number(total_stock);
        total_stock -= Number(transaction.item_quantity);

        console.log(`new total_stock: ${total_stock}`);

        console.log(`Transaction id: ${id} -> Transaction: ${transaction.item.id}\n`)

        await itemsRepository.update({ id: item_id }, { total_stock });

        await transactionsRepository.remove(transaction);

    }
}

export default DeleteTransactionService;
