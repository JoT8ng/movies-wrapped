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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default
        .find({}).populate('watchlist', { title: 1, });
    return user;
});
const addUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!username || !password) {
        throw new Error('missing username, password, or name');
    }
    if (username.length < 3 || password.length < 8) {
        throw new Error('username must be more than 3 characters long and password must be more than 8 characters long');
    }
    const existingUser = yield user_1.default.findOne({ username });
    if (existingUser) {
        throw new Error('username must be unique');
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = new user_1.default({
        username,
        passwordHash,
    });
    const savedUser = yield user.save();
    return savedUser;
});
exports.default = {
    getUser,
    addUser
};
