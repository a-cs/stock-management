import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

interface TmpUser {
    name: string;
    email: string;
    password?: string;
  }

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService()

    const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });
      let tmpUser: TmpUser = user

      delete tmpUser.password;

    return response.json({user:tmpUser, token});
});

export default sessionsRouter;
