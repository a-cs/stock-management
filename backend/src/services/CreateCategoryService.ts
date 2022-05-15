import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';

interface Request {
    name: string;
}

class CreateCategoryService {
    public async execute({
        name,
    }: Request): Promise<Category> {
        const categoriesRepository = getRepository(Category);

        const checkCategoryExists = await categoriesRepository.findOne({
            where: { name },
        });

        if (checkCategoryExists) {
            throw new AppError('Category name already used');
        }

        const category = categoriesRepository.create({
            name
        });

        await categoriesRepository.save(category);

        return category;
    }
}

export default CreateCategoryService;
