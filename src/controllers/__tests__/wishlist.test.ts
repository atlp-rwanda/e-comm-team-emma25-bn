import supertest from "supertest";
import createServer from "../../utils/server";
const app = createServer();

const fakeId = "ddjsh";
let Token: string;
let auth: string;
beforeAll(async () => {
  const res = await supertest(app).post("/login").send({
    email: "demo1@gmail.com",
    password: "string",
  });
  Token = res.body.token;
  auth = "Bearer " + Token;
}, 40000);

describe("Adding a product to the wishlist", () => {
  jest.setTimeout(50000);
  describe("User Tokens", () => {
    describe("When no token provided", () => {
      test("It should return 401", async () => {
        await supertest(app)
          .post(`/products/wishlist/add/${fakeId}`)
          .expect(401);
      });
    });
    describe("When invalid token provided", () => {
      test("It should return 406", async () => {
        await supertest(app)
          .post(`/products/wishlist/add/212`)
          .set("Authorization", `Bearer 7343847hbnmdvbmdvnehyu`)
          .expect(406);
      });
    });
  });
  describe("Parameter validation", () => {
    describe("When id is not string, not passed, minimum ox maximum of 12", () => {
      test("It should return 400", async () => {
        await supertest(app)
          .post(`/products/wishlist/add/23232`)
          .set("Authorization", auth)
          .expect(400);
      });
    });
  });
  describe("When logged in and product_id is provided", () => {
    describe("When product id passed in not found", () => {
      test("It should return 404", async () => {
        await supertest(app)
          .post(`/products/wishlist/add/t3j7hD9rnxqp`)
          .set("Authorization", auth)
          .expect(404);
      });
    });
  });
});
