// TODO replace the test below with your tests
import { add, multiply } from "../../totest";
import supertest from "supertest";
import app from "../../app";
import USER from "../../models/User";
import { httpRequest, httpResponse } from "../mock/user.mock";
import GoogleController from "../googleAuthController";
jest.setTimeout(70000);
describe("Login via google", () => {
  afterAll(async () => {
    USER.destroy({
      where: { email: "example@example.com" },
    });
  }, );
  test("redirect to google and authenticate", async () => {
    const data = await GoogleController.googleAuth(
      httpRequest("example@example.com"),
      httpResponse()
    );
    console.log(data);
    expect(data.body).toHaveProperty("user");
  });

  test("testing register", async () => {
    const data: any = await GoogleController.googleAuth(
      httpRequest("example@example.com"),
      httpResponse()
    );
    console.log(data);
    expect(data.body).toHaveProperty("user");
  });
  test("testing 500", async () => {
    const data: any = await GoogleController.googleAuth(
      "helll",
      httpResponse()
    );
    expect(data.body.status).toBe(500);
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Math functions", () => {
  it("should multiply 5 by 3", () => {
    const result = multiply(5, 3);
    expect(result).toEqual(15);
  });

  it("should add 5 by 3", () => {
    const result = add(5, 3);
    expect(result).toEqual(8);
  });
});
// reset password coontroller tests
describe("reset password", () => {
  describe("send link to email", () => {
    test("incase of unregistered email", async () => {
      const response = await supertest(app)
        .post("/resetpassword/link")
        .send({ email: "unregistered@gmail.com" });
      expect(response.status).toBe(400);
    }, 10000); // timeout 10 seconds
  });  
  
  test("incase invalid email input", async () => {
    const response = await supertest(app)
      .post("/resetpassword/link")
      .send({ email: "rukundjoseph" });
    expect(response.status).toBe(400);
  }, 20000);
  describe("add token and change password", () => {
    test("incase incorrect token", async () => {
      const response = await supertest(app)
        .patch("/changepassword/josephrukundo2002@gmail.com/65328dba23")
        .send({ newpassword: "newpassword", confirmpass: "newpassword" });
      expect(response.status).toBe(401);
    }, 20000);            
  });
});
