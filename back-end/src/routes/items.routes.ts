import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateItemService from '../services/CreateItemService';
import UpdateItemService from '../services/UpdateItemService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAllowed from '../middlewares/ensureIsAllowed';

import Item from '../models/Item';

const itemsRouter = Router();
itemsRouter.use(ensureAuthenticated)
itemsRouter.use(ensureIsAllowed)

itemsRouter.post('/', async (request, response) => {
    const { name } = request.body;

    const createItem = new CreateItemService();

    const item = await createItem.execute({
        name,
    });

    return response.json(item);
});

itemsRouter.patch('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, minimal_stock_alarm } = request.body;

    const updateItem = new UpdateItemService();

    const item = await updateItem.execute({
        id,
        name,
        minimal_stock_alarm
    });

    return response.json(item);
});

itemsRouter.get('/', async (request, response) => {
    const itemsRepository = getRepository(Item);
    const items = await itemsRepository.find({
        order: {
            id: "ASC",
        },
    });

    return response.json(items);
});

export default itemsRouter;
