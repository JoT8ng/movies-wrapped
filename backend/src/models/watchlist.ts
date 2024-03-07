/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose, { Schema } from "mongoose";
import { WatchlistMongo } from "../types/watchList";

const watchlistSchema: Schema<WatchlistMongo> = new mongoose.Schema({
    id: { type: Number, required: true },
    media_type: { type: String, required: true },
    title: { type: String, required: true },
    user_rating: { type: Number, required: true },
    comments: { type: String, required: true },
    date_watched: { type: String, required: true },
    release_date: { type: String, required: true },
    genres: [{ id: Number, name: String }],
    poster_path: { type: String, required: true },
});

watchlistSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

export default mongoose.model<WatchlistMongo>('Watchlist', watchlistSchema);