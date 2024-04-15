"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watchlist_1 = __importDefault(require("../models/watchlist"));
const user_1 = __importDefault(require("../models/user"));
const getWatchlist = () => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield watchlist_1.default
        .find({}).populate('user', { username: 1 });
    return list;
});
const getWatchlistUser = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield watchlist_1.default.find({ user: userid });
    return list;
});
const addEntry = (entry, tokenid) => __awaiter(void 0, void 0, void 0, function* () {
    const newEntry = entry;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const user = yield user_1.default.findById(tokenid);
    if (!user) {
        throw new Error('User not found');
    }
    if (!newEntry.user_rating || !newEntry.comments || !newEntry.date_watched) {
        newEntry.user_rating = 0;
        newEntry.comments = 'No comments added';
        newEntry.date_watched = `${year}-${month}-${day}`;
    }
    const addedEntry = new watchlist_1.default({
        id: newEntry.id,
        media_type: newEntry.media_type,
        title: newEntry.title,
        user_rating: newEntry.user_rating,
        comments: newEntry.comments,
        date_watched: newEntry.date_watched,
        release_date: newEntry.release_date,
        genres: newEntry.genres,
        poster_path: newEntry.poster_path,
        user: user._id
    });
    yield addedEntry.save();
    return addedEntry;
});
const deleteEntry = (id, tokenid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(tokenid);
    if (!user) {
        throw new Error('User not found');
    }
    const entryDelete = yield watchlist_1.default.findById(id);
    if (!entryDelete) {
        throw new Error('watchlist entry not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (entryDelete.user.toString() !== user._id.toString()) {
        throw new Error('only users to wrote watchlist entry can delete entry');
    }
    yield watchlist_1.default.findByIdAndDelete(id);
    return entryDelete;
});
const updateEntry = (id, entry, tokenid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(tokenid);
    if (!user) {
        throw new Error('User not found');
    }
    const entryToUpdate = yield watchlist_1.default.findById(id);
    if (!entryToUpdate) {
        throw new Error('Entry not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (entryToUpdate.user.toString() !== user._id.toString()) {
        throw new Error('only users to wrote watchlist entry can update entry');
    }
    if (!entry.user_rating || !entry.comments || !entry.date_watched) {
        entry.user_rating = entryToUpdate.user_rating;
        entry.comments = entryToUpdate.comments;
        entry.date_watched = entryToUpdate.date_watched;
    }
    const updatedEntry = {
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
    const finalEntry = yield watchlist_1.default.findByIdAndUpdate(id, updatedEntry, { new: true });
    return finalEntry;
});
exports.default = {
    getWatchlist,
    addEntry,
    deleteEntry,
    updateEntry,
    getWatchlistUser
};
