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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../utils/config"));
const getTrendingMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${config_1.default.TMDB_API_KEY}`);
    return response.data;
});
const getTrendingShows = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${config_1.default.TMDB_API_KEY}`);
    return response.data;
});
const searchMovies = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=1&api_key=${config_1.default.TMDB_API_KEY}`);
    return response.data;
});
const searchShows = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=true&language=en-US&page=1&api_key=${config_1.default.TMDB_API_KEY}`);
    return response.data;
});
const movieDetails = (idQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${idQuery}?language=en-US&api_key=${config_1.default.TMDB_API_KEY}`);
    return response.data;
});
const showDetails = (idQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/tv/${idQuery}?language=en-US&api_key=${config_1.default.TMDB_API_KEY}`);
    return response.data;
});
exports.default = {
    getTrendingMovies,
    getTrendingShows,
    searchMovies,
    searchShows,
    movieDetails,
    showDetails
};
