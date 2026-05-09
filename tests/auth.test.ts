import request from "supertest";
import app from "../src/app";
import * as userService from "../src/services/userService";
import bcrypt from "bcrypt";

jest.mock("../src/services/userService");

describe("POST /api/login", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return 200 and a token when credentials are valid", async () => {
		const loginData = {
			username: "testuser",
			password: "Password123!",
		};

		const hashedPassword = await bcrypt.hash(loginData.password, 10);

		(userService.validateUser as jest.Mock).mockResolvedValue({
			id: "550e8400-e29b-41d4-a716-446655440000",
			username: "testuser",
			email: "test@example.com",
			password: hashedPassword,
		});

		const response = await request(app).post("/api/login").send(loginData);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
		expect(typeof response.body.token).toBe("string");
	});

	it("should return 401 if user is not found", async () => {
		(userService.validateUser as jest.Mock).mockResolvedValue(null);

		const response = await request(app).post("/api/login").send({
			username: "wronguser",
			password: "somePassword",
		});

		expect(response.status).toBe(401);
		expect(response.body.error).toMatch(/invalid credentials/i);
	});

	it("should return 401 if password is incorrect", async () => {
		const loginData = {
			username: "testuser",
			password: "WrongPassword!",
		};

		(userService.validateUser as jest.Mock).mockResolvedValue({
			id: "550e8400-e29b-41d4-a716-446655440000",
			username: "testuser",
			email: "test@example.com",
			password: "correctHashedPassword",
		});

		const response = await request(app).post("/api/login").send(loginData);

		expect(response.status).toBe(401);
		expect(response.body.error).toMatch(/invalid credentials/i);
	});
});
