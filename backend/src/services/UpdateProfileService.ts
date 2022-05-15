import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    user_id: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

class UpdateProfileService {
    public async execute({
        user_id, name, email, oldPassword, password
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { id: user_id },
        });

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await usersRepository.findOne({
            where: { email },
        });

        if (userWithUpdatedEmail && String(userWithUpdatedEmail.id) !== user_id) {
            throw new AppError('Email is already in use');
        }

        Object.assign(user, { name, email })

        if (password && oldPassword) {
            const validOldPassword = await compare(
                oldPassword,
                user.password
            );

            if (!validOldPassword) {
                throw new AppError('Incorrect old password.');
            }

            user.password = await hash(password, 8);
        }

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
