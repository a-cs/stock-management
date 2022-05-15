import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Item from '../models/Item';
import Transaction from '../models/Transaction';

interface Request {
    id: string;
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

class UpdateTransactionService {
    public async execute({
        id,
        item_id,
        item_quantity,
        type,
    }: Request): Promise<Transaction> {
        const itemsRepository = getRepository(Item);
        const transactionsRepository = getRepository(Transaction);

        const transaction = await transactionsRepository.findOne({
            where: {
                id: id,
            },
        })

        if (!transaction) {
            throw new AppError('Transaction not found');
        }

        const checkItemExists = await itemsRepository.findOne({
            where: { id: item_id },
        });

        if (!checkItemExists) {
            throw new AppError('Item not found');
        }

        if (typeof item_quantity !== 'number') {
            throw new AppError('Invalid Item quantity');
        }

        if (item_quantity <= 0){
            throw new AppError('Item quantity can not be less than 1');
        }

        if (type !== 'in' && type !== 'out') {
            throw new AppError('Invalid Type');
        }

        // console.log(`OLD => item_id: ${transaction.item.id} type: ${transaction.type} total_stock: ${transaction.item.total_stock}, qty: ${transaction.item_quantity}`);

        transaction.item.total_stock = +transaction.item.total_stock
        transaction.item.total_stock -= transaction.item_quantity

        // console.log(`OLD NEW => item_id: ${transaction.item.id} type: ${transaction.type} total_stock: ${transaction.item.total_stock}, qty: ${transaction.item_quantity}`);
        await itemsRepository.update({ id: transaction.item.id }, { total_stock: transaction.item.total_stock });

        let total_stock
        if (transaction.item.id != item_id) {
            let query: QueryResult = await transactionsRepository
                .createQueryBuilder()
                .select('sum(item_quantity) as total_stock')
                .where('item_id= :item_id', { item_id })
                .groupBy('item_id')
                .orderBy('item_id')
                .getRawOne();


            if (!query) {
                query = { total_stock: 0 }
            }
            total_stock = query.total_stock
        } else {
            total_stock = transaction.item.total_stock
        }

        if (type === 'out') {
            item_quantity *= -1
        }
        total_stock = +total_stock;
        total_stock += item_quantity;
        // console.log(`NEW => item_id: ${item_id} type: ${type} total_stock: ${total_stock}, qty: ${item_quantity}`);

        await itemsRepository.update({ id: item_id }, { total_stock });

        const item = await itemsRepository.findOne({
            where: {
                id: item_id,
            },
        });

        await transactionsRepository.update(id, {
            item,
            item_quantity,
            type,
        });


        const newTransaction = await transactionsRepository.findOne({
            where: {
                id: id,
            },
        })

        if (!newTransaction) {
            throw new AppError('Transaction not found');
        }

        return newTransaction;
    }
}

export default UpdateTransactionService;
