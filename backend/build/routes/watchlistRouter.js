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
const watchlistService_1 = __importDefault(require("../services/watchlistService"));
const toNewEntry_1 = require("../utils/toNewEntry");
const middleware_1 = __importDefault(require("../utils/middleware"));
const watchlistRouter = express_1.default.Router();
watchlistRouter.get('/', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watchlist = yield watchlistService_1.default.getWatchlist();
        response.status(200).json(watchlist);
    }
    catch (exception) {
        next(exception);
    }
}));
watchlistRouter.post('/watchlist', middleware_1.default.checkBlacklist, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenid = middleware_1.default.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const userid = (0, toNewEntry_1.parseQuery)(request.body.user);
        const watchlist = yield watchlistService_1.default.getWatchlistUser(userid);
        response.status(200).json(watchlist);
    }
    catch (exception) {
        next(exception);
    }
}));
watchlistRouter.post('/add', middleware_1.default.checkBlacklist, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenid = middleware_1.default.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const entry = (0, toNewEntry_1.toNewEntry)(request.body);
        const addedEntry = yield watchlistService_1.default.addEntry(entry, tokenid);
        response.status(200).json(addedEntry);
    }
    catch (exception) {
        next(exception);
    }
}));
watchlistRouter.delete('/delete', middleware_1.default.checkBlacklist, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenid = middleware_1.default.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const id = (0, toNewEntry_1.parseQuery)(request.body.id);
        yield watchlistService_1.default.deleteEntry(id, tokenid);
        response.status(200).end();
    }
    catch (exception) {
        next(exception);
    }
}));
watchlistRouter.put('/update', middleware_1.default.checkBlacklist, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenid = middleware_1.default.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const id = (0, toNewEntry_1.parseQuery)(request.body.id);
        const entry = (0, toNewEntry_1.toUpdateEntry)(request.body);
        yield watchlistService_1.default.updateEntry(id, entry, tokenid);
        response.status(200).end();
    }
    catch (exception) {
        next(exception);
    }
}));
exports.default = watchlistRouter;
