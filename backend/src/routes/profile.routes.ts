import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UpdateProfileService from '../services/UpdateProfileService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAllowed from '../middlewares/ensureIsAllowed';

interface TmpUser {
    name: string;
    email: string;
    password?: string;
}

const profileRouter = Router();

profileRouter .use(ensureAuthenticated)
profileRouter .use(ensureIsAllowed)

profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string(),
        password: Joi.string().min(6).when('oldPassword', {
            is: String,
            then: Joi.string().required(),
        }),
        passwordConfirmation: Joi.string().when('oldPassword', {
            is: String,
            then: Joi.string().required().valid(Joi.ref('password')),
        }).messages({'any.only': 'Cofirmation password does not match password'})
    },
}), async (request, response) => {
    const { id: user_id } = request.user;
    const { name, email, oldPassword, password } = request.body;

    const updateProfile = new UpdateProfileService();



    const user = await updateProfile.execute({
        user_id, name, email, oldPassword, password
    });

    let tmpUser: TmpUser = user

    delete tmpUser.password;

    return response.json(tmpUser);
});

export default profileRouter;
