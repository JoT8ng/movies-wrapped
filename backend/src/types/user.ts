import mongoose from "mongoose";

export interface UserMongo extends Document {
    username: string;
    passwordHash: string;
    watchlist: mongoose.Schema.Types.ObjectId[];
}

export interface UserType {
    username: string;
    passwordHash: string;
    watchlist: mongoose.Schema.Types.ObjectId[];
}