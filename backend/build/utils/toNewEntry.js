"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUpdateEntry = exports.toNewEntry = exports.parseGenre = exports.parseIDQuery = exports.parseQuery = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (text) => {
    return typeof text === 'number' || text instanceof Number;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseQuery = (query) => {
    if (!query || !isString(query)) {
        throw new Error('Incorrect or missing query');
    }
    return query;
};
exports.parseQuery = parseQuery;
const parseIDQuery = (query) => {
    if (!query || !isNumber(query)) {
        throw new Error('Incorrect or missing query');
    }
    return query;
};
exports.parseIDQuery = parseIDQuery;
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseUpdateNumber = (query) => {
    if (!isNumber(query)) {
        throw new Error('Incorrect input is not number');
    }
    return query;
};
const parseUpdateString = (query) => {
    if (!isString(query)) {
        throw new Error('Incorrect input is not string');
    }
    return query;
};
const parseUpdateDate = (date) => {
    if (!isString(date) || !isDate) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGenre = (genres) => {
    if (!Array.isArray(genres)) {
        throw new Error('Genres must be an array');
    }
    const parsedGenres = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    genres.forEach((genre) => {
        if (!genre || typeof genre !== 'object') {
            throw new Error('Invalid genre object');
        }
        if (!isNumber(genre.id) || !isString(genre.name)) {
            throw new Error('Invalid genre format');
        }
        parsedGenres.push({ id: (0, exports.parseIDQuery)(genre.id), name: (0, exports.parseQuery)(genre.name) });
    });
    return parsedGenres;
};
exports.parseGenre = parseGenre;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (entry) {
        const newEntry = {
            id: (0, exports.parseIDQuery)(entry.id),
            media_type: (0, exports.parseQuery)(entry.media_type),
            title: (0, exports.parseQuery)(entry.title),
            user_rating: parseUpdateNumber(entry.user_rating),
            comments: parseUpdateString(entry.comments),
            date_watched: parseUpdateDate(entry.date_watched),
            release_date: parseDate(entry.release_date),
            genres: (0, exports.parseGenre)(entry.genres),
            poster_path: (0, exports.parseQuery)(entry.poster_path)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewEntry = toNewEntry;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUpdateEntry = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (entry) {
        const newEntry = {
            user_rating: parseUpdateNumber(entry.user_rating),
            comments: parseUpdateString(entry.comments),
            date_watched: parseUpdateString(entry.date_watched)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toUpdateEntry = toUpdateEntry;
