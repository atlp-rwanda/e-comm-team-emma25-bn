import supertest from "supertest";
import createServer from "../../utils/server";
const app = createServer()


describe("Allowing the sellers to add/delete product", () => {
    jest.setTimeout(120000);
    let Token: string;
    let auth: string;

    beforeAll(async () => {
        const res = await supertest(app)
            .post('/login')
            .send({
                email: 'string@yahoo.fr',
                password: 'string',
            });
        Token = res.body.token;
        auth = "Bearer " + Token;
    });
    describe("Adding Product", () => {
        describe("Validations", () => {
            describe("When there is no logged in user", () => {
                test("It should return 404 meaning that no loggedd user", async () => {
                    await supertest(app).post('/products/add').expect(404);
                })
            })
            describe("When there logged in user is not a seller", () => {
                test("It should return 403 'Not allowed to perform such action'", async () => {
                    await supertest(app).post('/products/add').set("Cookie", `token=${Token}`).expect(403);
                })
            })
        })
    })
    describe("Delete a product", () => {
        describe("Validations", () => {
            describe("When there is no logged in user", () => {
                test("It should return 401 meaning that no loggedd user", async () => {
                    await supertest(app).delete('/products/delete/9sDHRVree9W5').expect(401);
                })
            })
            describe("When there logged in user is not a seller", () => {
                test("It should return 403 'Not allowed to perform such action'", async () => {
                    await supertest(app).delete('/products/delete/9sDHRVree9W5').set("Cookie", `token=${Token}`).expect(403);
                })
            })
        })
    })
    

});
