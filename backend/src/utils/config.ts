import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const PORT = process.env.PORT;

const SECRET = process.env.SECRET;

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

export default {
  PORT,
  SECRET,
  TMDB_API_KEY,
  MONGODB_URI
};