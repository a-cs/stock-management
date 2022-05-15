import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request extends ExpressRequest {
    user: {
        id: string;
    }
  }

export default async function ensureIsAllowed (
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

    if (user.is_allowed) {
        return next()
    } else {
        throw new AppError('You are not allowed to do this, contact an Admin!', 403);
    }
}
