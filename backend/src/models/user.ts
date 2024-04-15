/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import mongoose, { Schema } from 'mongoose';
import { UserMongo } from '../types/user';

const userSchema: Schema<UserMongo> = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	passwordHash: {
		type: String,
		required: true,
		minlength: 8
	},
	watchlist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Watchlist'
		}
	],
});
  
userSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	}
});

export default mongoose.model<UserMongo>('User', userSchema);