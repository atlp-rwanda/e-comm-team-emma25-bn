import supertest from "supertest";
import createServer from "../../utils/server";
// import app from '../../app';

const app = createServer();
let token;
beforeAll(async () => {
  const res = await supertest(app).post("/login").send({
    email: "bicis68140@loongwin.com",
    password: "string",
  });
  token = res.body.token;
}, 40000);

describe("cart", () => {
  describe("add to cart", () => {
    test("in case  user loggedin", async () => {
      const response: any = await supertest(app)
        .post("/cart/add/so6JEwJcHlDh")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    }, 40000);
    test("update cart", async () => {
      const response: any = await supertest(app)
        .patch("/cart/9")
        .set("Authorization", `Bearer ${token}`)
        .send({ itemQuantity: 9 });
      expect(response.status).toBe(200);
    }, 40000);
    test("update cart", async () => {
      const response: any = await supertest(app)
        .patch("/cart/9")
        .set("Authorization", `Bearer ${token}`)
        .send({ itemQuantity: 10 });
      expect(response.status).toBe(200);
    }, 40000);
  });
});
