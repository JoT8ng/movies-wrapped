"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const toNewEntry_1 = require("../utils/toNewEntry");
const loginRouter = express_1.default.Router();
loginRouter.post('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (0, toNewEntry_1.parseQuery)(request.body.username);
    const password = (0, toNewEntry_1.parseQuery)(request.body.password);
    const user = yield user_1.default.findOne({ username });
    const passwordCorrect = user === null
        ? false
        : yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    if (!config_1.default.SECRET) {
        return response.status(500).json({
            error: 'Internal server error: SECRET is not defined'
        });
    }
    // token expires in in 15 minutes (900 seconds)
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET, { expiresIn: 900 });
    response
        .status(200)
        .send({ token, username: user.username, user_id: user._id });
}));
exports.default = loginRouter;
