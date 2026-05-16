import request from "supertest";
import jwt from "jsonwebtoken";
import config from "config";
import mongoose from "mongoose";
import Course from "../../schemas/course";
import { courses } from "../data";
import _, { cloneDeep } from "lodash";

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

  beforeEach(async () => {
    await Course.deleteMany({});
  });

  afterAll(async () => {
    if (server) {
      server.close();
    }
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  });

  test("get all courses should return 200", async () => {
    const token = generateTestToken();
    const res = await request(server).get("/api/courses").set("X-access-token", token);
    expect(res.status).toBe(200);
  });

  test("It should return 401 when token not provided", async () => {
    const token = generateTestToken();
    const res = await request(server).get("/api/courses");
    expect(res.status).toBe(401);
  });

  test("It should return correct data from db", async () => {
    await Course.collection.insertMany(_.cloneDeep(courses));
    const token = generateTestToken();
    const res = await request(server).get("/api/courses").set("X-access-token", token);
    console.log("res", res.body.length);
    expect(res.body.length).toBe(2);
    expect(res.body.some((obj) => obj.name === "RDBMS")).toBe(true);
  });

  test("It should 400 for invalid id when fetchig course", async () => {
    const token = generateTestToken();
    const res = await request(server).get("/api/courses/63734").set("X-access-token", token);
    expect(res.statusCode).toBe(400);
  });

  test("It should 404 if course not found with given id", async () => {
    const token = generateTestToken();
    const res = await request(server).get("/api/courses/6a087b1a1155e547a047c77b").set("X-access-token", token);
    expect(res.statusCode).toBe(404);
  });

  test("It should get the course successfully", async () => {
    await Course.collection.insertMany(_.cloneDeep(courses));
    const token = generateTestToken();
    const res = await request(server).get("/api/courses/6a0875e83cc3e2826d3b734b").set("X-access-token", token);
    expect(res.statusCode).toBe(200);

    expect(res.body.course.name).toBe("AI with DB");
  });

  test("It should update course successfully", async () => {
    await Course.collection.insertMany(_.cloneDeep(courses));
    const token = generateTestToken();
    const res = await request(server)
      .put("/api/courses/6a0875e83cc3e2826d3b734b")
      .send({
        name: "Champ",
        author: {
          name: "Kiran",
        },
        isPublished: false,
      })
      .set("X-access-token", token);
    expect(res.statusCode).toBe(200);

    expect(res.body.data.name).toBe("Champ");
    expect(res.body.data.author.name).toBe("Kiran");
    expect(res.body.data.isPublished).toBe(false);
  });

  test("It should 404 if course not found with given id when updating ", async () => {
    const token = generateTestToken();
    const res = await request(server)
      .put("/api/courses/6a087b1a1155e547a047c77b")
      .set("X-access-token", token)
      .send({
        name: "Champ",
        author: {
          name: "Kiran",
        },
        isPublished: false,
      });
    expect(res.statusCode).toBe(404);
  });

  test("It should delete course successfully", async () => {
    await Course.collection.insertMany(_.cloneDeep(courses));
    const token = generateTestToken();
    const res = await request(server).delete("/api/courses/6a0875e83cc3e2826d3b734b").set("X-access-token", token);
    expect(res.statusCode).toBe(200);
  });

  test("It should send 404 when course not found when deleting", async () => {
    await Course.collection.insertMany(_.cloneDeep(courses));
    const token = generateTestToken();
    const res = await request(server).delete("/api/courses/6a087b1a1155e547a047c77b").set("X-access-token", token);
    expect(res.statusCode).toBe(404);
  });
});
