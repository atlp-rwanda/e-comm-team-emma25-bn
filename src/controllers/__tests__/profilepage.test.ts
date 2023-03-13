import supertest from 'supertest'
import createServer from '../../utils/server'
/* eslint-disable @typescript-eslint/no-explicit-any */
const app = createServer()
let token 
beforeAll(async () => {
    const res = await supertest(app)
      .post('/login')
      .send({
        email: 'demo1@gmail.com',
        password: 'string',
      });
    token = res.body.token;
  }, 40000);


describe('profile page i', ()=>{
    test("get all profiles", async ()=>{
        const response = await supertest(app).get("/profiles")
        expect(response.status).toBe(200)},60000)
    test("single profile", async ()=>{
        const response = await supertest(app).get("/profile/104")
        expect(response.status).toBe(200)}, 60000)
    test("incase of unregistered user",async ()=>{
            const response = await supertest(app).get("/profile/1000")
            expect(response.status).toBe(400)}, 30000) 
   describe("edit profile",()=>{
    test("incase of no login", async ()=>{
      const response = await supertest(app).patch("/profile/edit").send({birthdate : "2022-01-01"})
      expect(response.status).toBe(401)
   })
})            
describe("incase of a a logged in user", ()=>{
    const profile={
        profileDetails: {
          phoneNumber: "+250788000000",
          gender: "Female",
          birthdate: "2002-03-01",
          language: "kinyarwanda"
        },
        billingAddress: {
          streetAddress: "kk509",
          city: "kigali",
          stateOrProvince: "kigali",
          zipOrPostalCode: "00000",
          country: "Rwanda"
        },
        address: {
          streetAddress: "kk509",
          city: "kigali",
          stateOrProvince: "kigali",
          zipOrPostalCode: "00000",
          country: "Rwanda"
        }
      }
    test('with invalid date', async ()=>{     
        const response = await supertest(app).patch("/profile/edit").set('Authorization', `Bearer ${token}`).send({...profile,profileDetails:{ birthdate: "2022-01-30"}})
        expect(response.status).toBe(406)
    })
    test('with invalid date', async ()=>{     
        const response = await supertest(app).patch("/profile/edit").set('Authorization', `Bearer ${token}`).send({...profile,profileDetails:{ birthdate: "2022-001-30"}})
        expect(response.status).toBe(406)
    })
    test('with valid date', async ()=>{     
        const response = await supertest(app).patch("/profile/edit").set('Authorization', `Bearer ${token}`).send({...profile})
        expect(response.status).toBe(200)
    })
       

})
   
})
