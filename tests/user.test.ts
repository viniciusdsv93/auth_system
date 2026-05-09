import request from "supertest";
import app from "../src/app";
import * as userService from "../src/services/userService";

jest.mock("../src/services/userService");

describe("POST /api/register", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return 201 and create a user when input is valid", async () => {
		const userData = {
			username: "testuser",
			email: "test@example.com",
			password: "Password123!",
		};

		userService.createUser.mockResolvedValue({
			id: 1,
			username: userData.username,
			email: userData.email,
			created_at: new Date(),
		});

		const response = await request(app).post("/api/register").send(userData);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.username).toBe(userData.username);
	});

	it("should return 400 if username is missing", async () => {
		const userData = {
			email: "test@example.com",
			password: "Password123!",
		};

		const response = await request(app).post("/api/register").send(userData);

		expect(response.status).toBe(400);
		expect(response.body.error).toMatch(/username is required/i);
	});

	it("should return 400 if email is invalid", async () => {
		const userData = {
			username: "testuser",
			email: "invalid-email",
			password: "Password123!",
		};

		const response = await request(app).post("/api/register").send(userData);

		expect(response.status).toBe(400);
		expect(response.body.error).toMatch(/invalid email/i);
	});

	it("should return 400 if password is too short", async () => {
		const userData = {
			username: "testuser",
			email: "test@example.com",
			password: "123",
		};

		const response = await request(app).post("/api/register").send(userData);

		expect(response.status).toBe(400);
		expect(response.body.error).toMatch(/password must be at least 6 characters/i);
	});
});
