import bcrypt from 'bcrypt';
import User from '../models/user';
import { UserMongo, UserType } from '../types/user';

const getUser = async (): Promise<UserType[]> => {
	const user = await User
		.find({}).populate('watchlist', { title: 1, });
	return user;
};

const addUser = async (username: string, password: string): Promise<UserMongo> => {
	if (!username || !password) {
		throw new Error('missing username, password, or name');
	}
    
	if (username.length < 3 || password.length < 8) {
		throw new Error('username must be more than 3 characters long and password must be more than 8 characters long');
	}

	const existingUser = await User.findOne({ username });

	if (existingUser) {
		throw new Error('username must be unique');
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		passwordHash,
	});

	const savedUser = await user.save();
	return savedUser;
};

export default {
	getUser,
	addUser
};