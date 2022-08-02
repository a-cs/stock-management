import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Item from '../models/Item';
import Category from '../models/Category';

interface Request {
    name: string;
    unit: string;
    category_id: number;
}

class CreateItemService {
    public async execute({
        name,
        unit,
        category_id,
    }: Request): Promise<Item> {
        const minimal_stock_alarm = 0
        const total_stock = 0

        if (!name || !unit || !category_id){
            throw new AppError('Missing parameter');
        }

        const itemsRepository = getRepository(Item);
        const categoriesRepository = getRepository(Category);

        const category = await categoriesRepository.findOne({
            where: { id:category_id },
        });

        if (!category) {
            throw new AppError('Category not found');
        }

        const checkItemExists = await itemsRepository.findOne({
            where: { name },
        });

        if (checkItemExists) {
            throw new AppError('Item name already used');
        }

        const item = itemsRepository.create({
            name,
            category,
            unit,
            minimal_stock_alarm,
            total_stock,
        });

        await itemsRepository.save(item);

        return item;
    }
}

export default CreateItemService;
