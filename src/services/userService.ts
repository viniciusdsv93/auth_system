import { db } from "../config/db";
import bcrypt from "bcrypt";
const uuid = require("uuid");

export const createUser = async (userData: any) => {
	console.log({ userData });

	const { username, email, password } = userData;
	const hashedPassword = await bcrypt.hash(password, 10);
	const id = uuid.v4();

	console.log({ hashedPassword, id });

	const user = await db.one(
		"INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4) RETURNING id, username, email, created_at",
		[id, username, email, hashedPassword],
	);

	console.log({ user });

	return user;
};

export const getAllUsers = async () => {
	return await db.any("SELECT id, username, email, created_at FROM users");
};

export const deleteAllUsers = async () => {
	await db.none("TRUNCATE TABLE users RESTART IDENTITY");
};

export const validateUser = async (username: string) => {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    return user;
};
