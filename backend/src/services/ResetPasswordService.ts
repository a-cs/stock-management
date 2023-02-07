import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import crypto from 'crypto'

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    email: string;
    adminId: string
    adminPassword: string;
}

class ResetPasswordService {
    public async execute({
        email, adminId, adminPassword
    }: Request): Promise<string> {
        console.log("email, adminId, adminPassword", email, adminId, adminPassword)
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError('User not found');
        }

        const admin = await usersRepository.findOne({
            where: { id:adminId },
        });

        if (!admin) {
            throw new AppError('Admin not found');
        }

        if (admin.id === user.id) {
            throw new AppError('You can not reset your own password');
        }

        // Object.assign(user, { name, email })
        let newPassword

        if (adminPassword) {
            const validPassword = await compare(
                adminPassword,
                admin.password
            );

            if (!validPassword) {
                throw new AppError('Incorrect admin password.');
            }

            newPassword = crypto.randomBytes(6).toString('base64')

            if(newPassword){
                user.password = await hash(newPassword, 8);
                await usersRepository.save(user);
                return newPassword;
            }
        }

        throw new AppError('Incorrect admin password.');
    }
}

export default ResetPasswordService;
