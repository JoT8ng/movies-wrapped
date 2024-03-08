import { WatchlistMongo, WatchlistType } from "../types/watchList";
import Watchlist from '../models/watchlist';

const getWatchlist = async (): Promise<WatchlistType[]> => {
    const list = await Watchlist.find();
    return list;
};

const addEntry = async (entry: WatchlistType): Promise<WatchlistMongo> => {
    const newEntry: WatchlistType = entry;

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

export default {
    getWatchlist,
    addEntry,
    deleteEntry
};