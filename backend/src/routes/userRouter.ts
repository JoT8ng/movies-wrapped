import express from 'express';
import userService from '../services/userService';
import { parseQuery } from '../utils/toNewEntry';

const userRouter = express.Router();

userRouter.get('/', async (_request, response, next) => {
    try {
        const users = await userService.getUser();
        response.status(200).json(users);
    } catch (exception) {
        next (exception);
    }
});

userRouter.post('/', async (request, response, next) => {
    const username = parseQuery(request.body.username);
    const password = parseQuery(request.body.password);
    
    try {
        const newUser = await userService.addUser(username, password);
        response.status(200).json(newUser);
    } catch (exception) {
        next (exception);
    }
});

export default userRouter;