import supertest from "supertest";
import createServer from "../../utils/server";

const app = createServer();
const phone = "+250783006902";
jest.setTimeout(120000);

describe("Two-Factor Authentication", () => {
  describe("Sending Verification Code", () => {
    test("Should return 400 if invalid number provided", async () => {
      await supertest(app).get("/sendcode/6433").expect(404);
    });

    test("Should return 404 if no number provided", async () => {
      await supertest(app).get("/sendcode/").expect(404);
    });
  });

  describe("Verifying Verification Code", () => {
    test("Should return 400 if invalid number or OTP provided", async () => {
      await supertest(app).get(`/verify/${phone}/636`).expect(400);
    });

    test("Should return 404 if no OTP or number provided", async () => {
      await supertest(app).get(`/verify/`).expect(404);
    });
  });
});
