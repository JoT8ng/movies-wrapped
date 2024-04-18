"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env.local') });
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const FRONTEND_URL = process.env.NODE_ENV === 'development'
    ? process.env.DEV_URL
    : process.env.PROD_URL;
exports.default = {
    PORT,
    SECRET,
    TMDB_API_KEY,
    MONGODB_URI,
    FRONTEND_URL
};
