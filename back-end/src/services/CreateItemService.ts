import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Item from '../models/Item';

interface Request {
    name: string;
    minimal_stock_alarm?: string;
    total_stock?: string;
}

class CreateItemService {
    public async execute({
        name,
        minimal_stock_alarm = '0',
        total_stock = '0',
    }: Request): Promise<Item> {
        const itemsRepository = getRepository(Item);

        const checkItemExists = await itemsRepository.findOne({
            where: { name },
        });

        if (checkItemExists) {
            throw new AppError('Item name already used');
        }

        const item = itemsRepository.create({
            name,
            minimal_stock_alarm,
            total_stock,
        });

        await itemsRepository.save(item);

        return item;
    }
}

export default CreateItemService;
