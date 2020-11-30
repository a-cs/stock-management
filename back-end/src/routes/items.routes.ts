import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateItemService from '../services/CreateItemService';

import Item from '../models/Item';

const itemsRouter = Router();

itemsRouter.post('/', async (request, response) => {
    const { name, minimal_stock_alarm, total_stock } = request.body;

    const createItem = new CreateItemService();

    const item = await createItem.execute({
        name,
        minimal_stock_alarm,
        total_stock,
    });

    return response.json(item);
});

itemsRouter.get('/', async (request, response) => {
    const itemsRepository = getRepository(Item);
    const items = await itemsRepository.find();

    return response.json(items);
});

export default itemsRouter;
