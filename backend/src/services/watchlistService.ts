import { UpdateEntry, WatchlistMongo, WatchlistType } from "../types/watchList";
import Watchlist from '../models/watchlist';
import { UpdateQuery } from "mongoose";

const getWatchlist = async (): Promise<WatchlistType[]> => {
    const list = await Watchlist
        .find({}).populate('user', { username: 1});
    return list;
};

const addEntry = async (entry: WatchlistType): Promise<WatchlistMongo> => {
    const newEntry: WatchlistType = entry;

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (!newEntry.user_rating || !newEntry.comments || !newEntry.date_watched) {
        newEntry.user_rating = 0;
        newEntry.comments = 'No comments added';
        newEntry.date_watched = `${year}-${month}-${day}`;
    }

    const addedEntry: WatchlistMongo = new Watchlist({
        id: newEntry.id,
        media_type: newEntry.media_type,
        title: newEntry.title,
        user_rating: newEntry.user_rating,
        comments: newEntry.comments,
        date_watched: newEntry.date_watched,
        release_date: newEntry.release_date,
        genres: newEntry.genres,
        poster_path: newEntry.poster_path
    });
    
    await addedEntry.save();
    return addedEntry;
};

const deleteEntry = async (id: string): Promise<WatchlistMongo | null> => {
    const entryDelete = await Watchlist.findById(id);
    await Watchlist.findByIdAndDelete(id);

    return entryDelete;
};

const updateEntry = async (id: string, entry: UpdateEntry): Promise<WatchlistMongo | null> => {
    const entryToUpdate: WatchlistMongo | null = await Watchlist.findById(id);
    
    if (!entryToUpdate) {
        throw new Error('Entry not found');
    }

    if (!entry.user_rating || !entry.comments || !entry.date_watched) {
        entry.user_rating = entryToUpdate.user_rating;
        entry.comments = entryToUpdate.comments;
        entry.date_watched = entryToUpdate.date_watched;
    }

    const updatedEntry: UpdateQuery<WatchlistMongo> = {
        id: entryToUpdate.id,
        media_type: entryToUpdate.media_type,
        title: entryToUpdate.title,
        user_rating: entry.user_rating,
        comments: entry.comments,
        date_watched: entry.date_watched,
        release_date: entryToUpdate.release_date,
        genres: entryToUpdate.genres,
        poster_path: entryToUpdate.poster_path
    };

    const finalEntry = await Watchlist.findByIdAndUpdate(id, updatedEntry, {new: true});
    return finalEntry;
};

export default {
    getWatchlist,
    addEntry,
    deleteEntry,
    updateEntry
};