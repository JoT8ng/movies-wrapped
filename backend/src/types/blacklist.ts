import { Document } from "mongoose";

export interface BlacklistMongo extends Document {
    token: string;
}

export interface BlacklistType {
    token: string;
}