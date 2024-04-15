"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const mongoose_1 = __importDefault(require("mongoose"));
const watchlistSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    media_type: { type: String, required: true },
    title: { type: String, required: true },
    user_rating: { type: Number, required: true, default: 0 },
    comments: { type: String, required: true, default: '' },
    date_watched: { type: String, required: true, default: '' },
    release_date: { type: String, required: true },
    genres: [{ id: Number, name: String }],
    poster_path: { type: String, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
watchlistSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports.default = mongoose_1.default.model('Watchlist', watchlistSchema);
