// Libraries
import type { ObjectId } from 'mongoose';

// Constants
import type { Roles } from '@constants/User';

export interface IUser {
	_id: ObjectId;
	username: string;
	email: string;
	password: string;
	status: boolean;
	role: Roles;
	updatedAt: Date;
	createdAt: Date;
}

export interface IRegisterUser {
	username: string;
	email: string;
	password: string;
}

export interface ILoginUser {
	email: string;
	password: string;
}
