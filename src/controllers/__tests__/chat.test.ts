import supertest from "supertest";
import createServer from "../../utils/server";

const app = createServer();
jest.setTimeout(120000);

describe("Chats", () => {
    describe("Rendering a chat page", () => {
        test("it should send chat file", async () => {
            await supertest(app).get("/chat").expect(200);
        });
    })
});