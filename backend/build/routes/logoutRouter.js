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
const middleware_1 = __importDefault(require("../utils/middleware"));
const blacklist_1 = __importDefault(require("../models/blacklist"));
const logoutRouter = express_1.default.Router();
logoutRouter.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = middleware_1.default.getTokenFrom(request);
        if (!token) {
            throw new Error('Token not found');
        }
        const checkIfBlacklisted = yield blacklist_1.default.findOne({ token: token });
        if (checkIfBlacklisted) {
            return response.status(401).json({ error: 'token expired or invalid' });
        }
        const addedToken = new blacklist_1.default({
            token: token
        });
        yield addedToken.save();
        response.status(200).json('You have been successfully logged out!');
    }
    catch (exception) {
        next(exception);
    }
}));
exports.default = logoutRouter;
