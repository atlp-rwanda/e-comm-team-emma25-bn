// TODO replace the test below with your tests
import {add, multiply} from '../../totest'
import supertest from "supertest"
import app from '../../app';
import { config } from "dotenv"
config()
describe('Math functions', () => {
  it('should multiply 5 by 3', () => {
    const result = multiply(5, 3)
    expect(result).toEqual(15)
  })

  it('should add 5 by 3', () => {
    const result = add(5, 3)
    expect(result).toEqual(8)
  })
})
describe('Route test', () => {
  test('get any specified route', () => {
    return supertest(app)
      .get('/users')
      .then(response => {
        expect(response.status).toBe(200);
      });
  },30000); // pass options object with a 20 second timeout
});

// reset password coontroller tests
describe('reset password',()=>{
  describe('send link to email' , ()=>{
    test('incase of unregistered email', async ()=>{     
      const response = await supertest(app).post("/resetpassword/link").send({email: "unregistered@gmail.com"})      
      expect(response.status).toBe(400)
          })// timeout 10 seconds
  })
    test('incase of a registered email', async ()=>{     
      const response = await supertest(app).post("/resetpassword/link").send({email: "jeandamas85@gmail.co"})      
      expect(response.status).toBe(200)
          }, 20000)
          test('incase invalid email input', async ()=>{     
            const response = await supertest(app).post("/resetpassword/link").send({email: "rukundjoseph"})      
            expect(response.status).toBe(400)
                }, 20000)
  describe('add token and change password',()=>{
    test('incase incorrect token', async ()=>{     
      const response = await supertest(app).patch("/changepassword/0/65328dba23").send({newpassword : "newpassword",
    confirmpass: "newpassword"})      
      expect(response.status).toBe(400)
          }, 20000)
          test('incase incorrect token', async ()=>{     
            const response = await supertest(app).patch("/changepassword/5/65328dba23").send({newpassword : "newpassword",
          confirmpass: "newpassword"})      
            expect(response.status).toBe(400)
                }, 20000)
  })
        })


