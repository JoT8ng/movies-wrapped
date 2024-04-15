import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { parseQuery } from '../utils/toNewEntry';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
	const username = parseQuery(request.body.username);
	const password = parseQuery(request.body.password);
  
	const user = await User.findOne({ username });
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash);
  
	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		});
	}
  
	const userForToken = {
		username: user.username,
		id: user._id,
	};

	if (!config.SECRET) {
		return response.status(500).json({
			error: 'Internal server error: SECRET is not defined'
		});
	}
  
	// token expires in 60*60 seconds, that is, in one hour
	const token = jwt.sign(
		userForToken, 
		config.SECRET,
		{ expiresIn: 60*60 }
	);
  
	response
		.status(200)
		.send({ token, username: user.username, user_id: user._id });
});

export default loginRouter;