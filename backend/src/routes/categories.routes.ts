import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAllowed from '../middlewares/ensureIsAllowed';

import Category from '../models/Category';

const categoriesRouter = Router();
categoriesRouter.use(ensureAuthenticated)
categoriesRouter.use(ensureIsAllowed)

categoriesRouter.post('/', async (request, response) => {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({
        name,
    });

    return response.json(category);
});

categoriesRouter.patch('/:id', async (request, response) => {
    const { id } = request.params;
    const { name} = request.body;

    const updateCategory = new UpdateCategoryService();

    const category = await updateCategory.execute({
        id,
        name,
    });

    return response.json(category);
});

categoriesRouter.get('/', async (request, response) => {
    const categoriesRepository = getRepository(Category);
    const categories = await categoriesRepository.find({
        order: {
            id: "ASC",
        },
    });

    return response.json(categories);
});

export default categoriesRouter;
