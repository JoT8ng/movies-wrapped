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

export default {
    getWatchlist,
    addEntry
};