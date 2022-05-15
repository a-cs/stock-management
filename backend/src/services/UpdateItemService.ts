import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Category from '../models/Category';

import Item from '../models/Item';

interface Request {
    id: string;
    name: string;
    category_id: number;
    minimal_stock_alarm: number;
}

class UpdateItemService {
    public async execute({
        id,
        name,
        category_id,
        minimal_stock_alarm,
    }: Request): Promise<Item> {
        const itemsRepository = getRepository(Item);
        const categoriesRepository = getRepository(Category);

        const category = await categoriesRepository.findOne({
            where: { id:category_id },
        });

        if (!category) {
            throw new AppError('Category not found');
        }

        const item = await itemsRepository.findOne({
            where: { id: id },
        });

        if (!item) {
            throw new AppError('Item not found');
        }

        const checkItemExists = await itemsRepository.findOne({
            where: { name },
        });

        if (checkItemExists && checkItemExists?.id !== item.id) {
            throw new AppError('Item name already used');
        }

        if(isNaN(minimal_stock_alarm ))
            throw new AppError('Minimal stock alarm value is not a number');

        await itemsRepository.update(id, {
            name,
            category,
            minimal_stock_alarm,
        });

        const newItem = await itemsRepository.findOne({
            where: {
                id: id,
            },
        })

        if (!newItem) {
            throw new AppError('Item not found');
        }

        return newItem;
    }
}

export default UpdateItemService;
