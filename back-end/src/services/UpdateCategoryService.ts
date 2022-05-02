import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';

interface Request {
    id: string;
    name: string;
}

class UpdateCategoryService {
    public async execute({
        id,
        name,
    }: Request): Promise<Category> {
        const categoriesRepository = getRepository(Category);

        const category = await categoriesRepository.findOne({
            where: { id: id },
        });

        if (!category) {
            throw new AppError('Category not found');
        }

        const checkCategoryExists = await categoriesRepository.findOne({
            where: { name },
        });

        if (checkCategoryExists && checkCategoryExists?.id !== category.id) {
            throw new AppError('Category name already used');
        }

        await categoriesRepository.update(id, {
            name
        });

        const newCategory = await categoriesRepository.findOne({
            where: {
                id: id,
            },
        })

        if (!newCategory) {
            throw new AppError('Category not found');
        }

        return newCategory;
    }
}

export default UpdateCategoryService;
