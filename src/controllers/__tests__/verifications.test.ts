import supertest from "supertest";
import createServer from "../../utils/server";
const app = createServer()

const phone = '+250783006902';
describe('Two-Factor Authentication', () => {
    describe('Sending Verification Code', () => {
        describe('If invalid number provided', () => {
            it('Should return 400 with a message', async() =>{
                await supertest(app).get('/sendcode/6433').expect(400) 
            })
        })
        describe('If no number provided', () => {
            it('Should return 404', async() =>{
                await supertest(app).get('/sendcode/').expect(404) 
            })
        })
        describe('If correct number provided', () => {
            it('Should return 200 with a verification status', async() =>{
                await supertest(app).get(`/sendcode/${phone}`).expect(200) 
            })
        })
    })
    describe('Verifying Verification Code', () => {
        describe('If invalid number or OTP provided', () => {
            it('Should return 400 with a message', async() =>{
                await supertest(app).get(`/verify/${phone}/636`).expect(400) 
            })
        })
        describe('If no OTP or number provided', () => {
            it('Should return 404', async() =>{
                await supertest(app).get(`/verify/`).expect(404) 
            })
        })
        
    })
})