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
const tmdbService_1 = __importDefault(require("../services/tmdbService"));
const toNewEntry_1 = require("../utils/toNewEntry");
const tmdbRouter = express_1.default.Router();
tmdbRouter.get('/trending/movies', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trendingMovies = yield tmdbService_1.default.getTrendingMovies();
        response.json(trendingMovies);
    }
    catch (exception) {
        next(exception);
    }
}));
tmdbRouter.get('/trending/tv', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trendingShows = yield tmdbService_1.default.getTrendingShows();
        response.json(trendingShows);
    }
    catch (exception) {
        next(exception);
    }
}));
tmdbRouter.post('/search/movies', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = (0, toNewEntry_1.parseQuery)(request.body.query);
        const searchMovies = yield tmdbService_1.default.searchMovies(searchQuery);
        response.json(searchMovies);
    }
    catch (exception) {
        next(exception);
    }
}));
tmdbRouter.post('/search/tv', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = (0, toNewEntry_1.parseQuery)(request.body.query);
        const searchShows = yield tmdbService_1.default.searchShows(searchQuery);
        response.json(searchShows);
    }
    catch (exception) {
        next(exception);
    }
}));
tmdbRouter.post('/movies', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idQuery = (0, toNewEntry_1.parseQuery)(_request.body.query);
        const movie = yield tmdbService_1.default.movieDetails(idQuery);
        response.json(movie);
    }
    catch (exception) {
        next(exception);
    }
}));
tmdbRouter.post('/tv', (_request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idQuery = (0, toNewEntry_1.parseQuery)(_request.body.query);
        const show = yield tmdbService_1.default.showDetails(idQuery);
        response.json(show);
    }
    catch (exception) {
        next(exception);
    }
}));
exports.default = tmdbRouter;
