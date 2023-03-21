import supertest from "supertest";
import createServer from "../../utils/server";
/* eslint-disable @typescript-eslint/no-explicit-any */
const app = createServer();
let token;
beforeAll(async () => {
    const res = await supertest(app).post("/login").send({
        email: "tec@gmail.com",
        password: "adminpass",
    });
    token = res.body.token;
}, 40000);

describe("Seller Collection", () => {
    describe("Seller update product availability", () => {
        test("Seller update non-existing product", async () => {
            const response = await supertest(app).patch(
                "/products/delete/72753"
            );
            expect(response.status).toBe(404);
        }, 60000);
        test("unauthorised access", async () => {
            const response = await supertest(app).patch(
                "/products/delete/72753"
            );
            expect(response.status).toBe(404);
        }, 60000);
    });
});
