import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default {
  PORT,
  SECRET,
  TMDB_API_KEY
};