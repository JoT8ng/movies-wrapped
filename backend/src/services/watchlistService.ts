import watchData from "../test-data/watchData";
import { WatchlistType } from "../types/watchList";

const watchList: WatchlistType[] = watchData;

const getWatchlist = (): WatchlistType[] => {
    return watchList;
};

const addEntry = (entry: WatchlistType): WatchlistType => {
    watchList.push(entry);
    return entry;
};

const deleteEntry = (id: number): WatchlistType[] => {
    const index = watchList.findIndex(entry => entry.id === id);

    if (index !== -1) {
        watchList.splice(index, 1);
    }

    return watchList;
};

export default {
    getWatchlist,
    addEntry,
    deleteEntry
};