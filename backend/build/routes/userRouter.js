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
const userService_1 = __importDefault(require("../services/userService"));
const toNewEntry_1 = require("../utils/toNewEntry");
const userRouter = express_1.default.Router();
userRouter.get('/', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.default.getUser();
        response.status(200).json(users);
    }
    catch (exception) {
        next(exception);
    }
}));
userRouter.post('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (0, toNewEntry_1.parseQuery)(request.body.username);
    const password = (0, toNewEntry_1.parseQuery)(request.body.password);
    try {
        const newUser = yield userService_1.default.addUser(username, password);
        response.status(200).json(newUser);
    }
    catch (exception) {
        next(exception);
    }
}));
exports.default = userRouter;
