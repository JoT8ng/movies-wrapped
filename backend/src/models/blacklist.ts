/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose, { Schema } from 'mongoose';
import { BlacklistMongo } from '../types/blacklist';

const blacklistSchema: Schema<BlacklistMongo> = new mongoose.Schema({
	token: { type: String, required: true }
});

blacklistSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

export default mongoose.model<BlacklistMongo>('Blacklist', blacklistSchema);