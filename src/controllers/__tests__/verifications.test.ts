import supertest from "supertest";
import createServer from "../../utils/server";
const app = createServer();

const phone = "+250783006902";
describe("Two-Factor Authentication", () => {
  describe("Sending Verification Code", () => {
    describe("If invalid number provided", () => {
      test("Should return 400 with a message", async () => {
        await supertest(app).get("/sendcode/6433").expect(400);
      }, 20000);
    });
    describe("If no number provided", () => {
      test("Should return 404", async () => {
        await supertest(app).get("/sendcode/").expect(404);
      }, 20000);
    });
  });
  describe("Verifying Verification Code", () => {
    describe("If invalid number or OTP provided", () => {
      test("Should return 400 with a message", async () => {
        await supertest(app).get(`/verify/${phone}/636`).expect(400);
      }, 20000);
    });
    describe("If no OTP or number provided", () => {
      test("Should return 404", async () => {
        await supertest(app).get(`/verify/`).expect(404);
      }, 20000);
    });
  });
});
