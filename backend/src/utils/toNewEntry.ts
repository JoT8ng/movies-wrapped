import { Genre } from "../types/details";
import { UpdateEntry, WatchlistType } from "../types/watchList";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown) : text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const parseQuery = (query: unknown): string => {
    if(!query || !isString(query)){
        throw new Error('Incorrect or missing query');
    }
    return query;
};

export const parseIDQuery = (query: unknown): number => {
    if(!query || !isNumber(query) ){
        throw new Error('Incorrect or missing query');
    }
    return query;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate){
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseUpdateNumber = (query: unknown): number => {
    if(!isNumber(query) ){
        throw new Error('Incorrect input is not number');
    }
    return query;
};

const parseUpdateString = (query: unknown): string => {
    if(!isString(query)){
        throw new Error('Incorrect input is not string');
    }
    return query;
};

const parseUpdateDate = (date: unknown): string => {
    if(!isString(date) || !isDate){
        throw new Error('Incorrect or missing date');
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseGenre = (genres: any): Genre[] => {
    if (!Array.isArray(genres)) {
        throw new Error('Genres must be an array');
    }

    const parsedGenres: Genre[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    genres.forEach((genre: any) => {
        if (!genre || typeof genre !== 'object') {
            throw new Error('Invalid genre object');
        }
        if (!isNumber(genre.id) || !isString(genre.name)) {
            throw new Error('Invalid genre format');
        }
        parsedGenres.push({ id: parseIDQuery(genre.id), name: parseQuery(genre.name) });
    });

    return parsedGenres;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): WatchlistType => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (entry) {
        const newEntry: WatchlistType = {
            id: parseIDQuery(entry.id),
            media_type: parseQuery(entry.media_type),
            title: parseQuery(entry.title),
            user_rating: parseUpdateNumber(entry.user_rating),
            comments: parseUpdateString(entry.comments),
            date_watched: parseUpdateDate(entry.date_watched),
            release_date: parseDate(entry.release_date),
            genres: parseGenre(entry.genres),
            poster_path: parseQuery(entry.poster_path)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUpdateEntry = (entry: any): UpdateEntry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (entry) {
        const newEntry: UpdateEntry = {
            user_rating: parseUpdateNumber(entry.user_rating),
            comments: parseUpdateString(entry.comments),
            date_watched: parseUpdateString(entry.date_watched)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};