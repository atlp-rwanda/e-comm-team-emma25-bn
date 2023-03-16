import supertest from "supertest";
import createServer from "../../../utils/server";
/* eslint-disable @typescript-eslint/no-explicit-any */
const app = createServer();
let token;
beforeAll(async () => {
    const res = await supertest(app).post("/login").send({
        email: "admin@gmail.com",
        password: "adminpass",
    });
    token = res.body.token;
}, 40000);

describe("Admin Manage roles", () => {
    describe("Authorised Access", () => {
        test("View All Roles", async () => {
            const response = await supertest(app).get("/role");
            expect(response.status).toBe(404);
        }, 60000);
        test("Get role by name", async () => {
            const response = await supertest(app).get("/role/admin");
            expect(response.status).toBe(404);
        }, 60000);
    });
});
