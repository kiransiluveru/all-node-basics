import request from "supertest";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";

let server;

// Helper to generate a test JWT token
const generateTestToken = () => {
  return jwt.sign({ id: "test-user-id", email: "test@example.com" }, config.get("jwt_secret_key"));
};

describe("Courses tests", () => {
  beforeAll(async () => {
    const imported = await import("../..");
    server = imported.default;
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  });

  test("It should return all courses", async () => {
    const token = generateTestToken();
    const res = await request(server).get("/api/courses").set("X-access-token", token);

    expect(res.status).toBe(200);
  });
  test("It should return 401 when token not provided", async () => {
    const token = generateTestToken();
    const res = await request(server).get("/api/courses");
    expect(res.status).toBe(401);
  });

});
