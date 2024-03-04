import express from 'express';
import { Application } from 'express';
require('express-async-errors');
const app: Application = express();
import cors from 'cors';

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('dist'));

export default app;