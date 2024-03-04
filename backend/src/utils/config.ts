import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

export default {
  PORT,
  SECRET
};