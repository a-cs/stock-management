import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    id: string;
    is_admin: boolean;
    is_allowed: boolean;
}

class UpdateUserPrivilegesService {
    public async execute({
        id,
        is_admin,
        is_allowed
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { id: id },
        });

        if (!user) {
            throw new AppError('User not found');
        }

        await usersRepository.update(id, {
            is_admin,
            is_allowed
        });

        const newUser = await usersRepository.findOne({
            where: {
                id: id,
            },
            select: [
                "id",
                "name",
                "is_admin",
                "is_allowed"
                ],
        })

        if (!newUser) {
            throw new AppError('User not found');
        }

        return newUser;
    }
}

export default UpdateUserPrivilegesService;
