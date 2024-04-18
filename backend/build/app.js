"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const app = (0, express_1.default)();
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const cors_1 = __importDefault(require("cors"));
const tmdbRouter_1 = __importDefault(require("./routes/tmdbRouter"));
const watchlistRouter_1 = __importDefault(require("./routes/watchlistRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const logoutRouter_1 = __importDefault(require("./routes/logoutRouter"));
mongoose_1.default.set('strictQuery', false);
logger_1.default.info('connecting to', config_1.default.MONGODB_URI);
mongoose_1.default.connect(config_1.default.MONGODB_URI)
    .then(() => {
    logger_1.default.info('connected to MongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connecting to MongoDB:', error.message);
});
const corsOptions = {
    origin: config_1.default.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
};
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static('dist'));
app.use(middleware_1.default.requestLogger);
app.use(middleware_1.default.limiter);
app.use('/tmdb', tmdbRouter_1.default);
app.use('/', watchlistRouter_1.default);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/users', userRouter_1.default);
app.use('/login', loginRouter_1.default);
app.use('/logout', logoutRouter_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
