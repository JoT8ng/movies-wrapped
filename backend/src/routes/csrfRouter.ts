import express from 'express';
import middleware from '../utils/middleware';

const csrfRouter = express.Router();

csrfRouter.get('/csrf', (request, response) => {
	const csrfToken = middleware.generateToken(request, response);
	// You could also pass the token into the context of a HTML response.
	response.json({ csrfToken });
});

export default csrfRouter;