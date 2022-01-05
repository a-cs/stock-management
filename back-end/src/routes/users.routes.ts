import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UpdateUserPrivilegesService from '../services/UpdateUserPrivilegesService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAllowed from '../middlewares/ensureIsAllowed';
import ensureIsAdmin from '../middlewares/ensureIsAdmin';

import User from '../models/User';

interface TmpUser {
    name: string;
    email: string;
    password?: string;
  }

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name, email, password
    });

    let tmpUser: TmpUser = user

    delete tmpUser.password;

    return response.json(tmpUser);
});

usersRouter.patch('/:id',ensureAuthenticated, ensureIsAllowed, ensureIsAdmin, async (request, response) => {
    const { id } = request.params;
    const { is_admin, is_allowed } = request.body;

    console.log(request)

    const updateItem = new UpdateUserPrivilegesService();

    const user = await updateItem.execute({
        id,
        is_admin,
        is_allowed,
    })

    return response.json(user);
});

usersRouter.get('/',ensureAuthenticated, ensureIsAllowed, ensureIsAdmin, async (request, response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find({
        select: [
        "id",
        "name",
        "email",
        "is_admin",
        "is_allowed"
        ],
        order: {
            name: "ASC",
        },
    });

    return response.json(users);
});

export default usersRouter;
