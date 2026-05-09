import { Request, Response } from "express";
import * as userService from "../services/userService";

export const register = async (req: Request, res: Response) => {
	console.log({ 5: req });

	if (!req.body) {
		return res.status(400).json({ error: "Request body is missing" });
	}

	const { username, email, password } = req.body;

	if (!username) {
		return res.status(400).json({ error: "Username is required" });
	}

	if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
		return res.status(400).json({ error: "Invalid email" });
	}

	if (!password || password.length < 6) {
		return res.status(400).json({ error: "Password must be at least 6 characters" });
	}

	try {
		const user = await userService.createUser({ username, email, password });
		res.status(201).json(user);
	} catch (error: any) {
		if (error.code === "23505") {
			return res.status(400).json({ error: "Username or email already exists" });
		}
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getUsers = async (req: Request, res: Response) => {
	console.log({ 31: req });

	try {
		const users = await userService.getAllUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteUsers = async (req: Request, res: Response) => {
	try {
		await userService.deleteAllUsers();
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
