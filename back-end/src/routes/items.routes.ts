import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateItemService from '../services/CreateItemService';

import Item from '../models/Item';

const itemsRouter = Router();

itemsRouter.post('/', async (request, response) => {
    const { name } = request.body;

    const createItem = new CreateItemService();

    const item = await createItem.execute({
        name,
    });

    return response.json(item);
});

itemsRouter.get('/', async (request, response) => {
    const itemsRepository = getRepository(Item);
    const items = await itemsRepository.find();

    return response.json(items);
});

export default itemsRouter;
