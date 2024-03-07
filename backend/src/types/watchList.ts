import { Genre } from "./details";
import { Document } from "mongoose";

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

export interface WatchlistMongo extends Document {
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