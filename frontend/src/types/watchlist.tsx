import { Genre } from "./details";

export interface WatchlistType {
    id: number;
    media_type: string;
    title: string;
    user_rating: number;
    comments: string;
    date_watched: string;
    release_date: string;
    genres: Genre[];
    poster_path: string;
}

export interface UpdateEntry {
    user_rating: number;
    comments: string;
    date_watched: string;
}