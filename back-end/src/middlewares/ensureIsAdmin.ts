import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request extends ExpressRequest {
    user: {
        id: string;
    }
  }

export default async function ensureIsAdmin(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id }= request.user;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
        where: { id: id },
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    if (user.is_admin) {
        return next()
    } else {
        throw new AppError('You do not have admin privileges!', 403);
    }
}
