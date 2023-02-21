// TODO replace the test below with your tests
import request from 'supertest'
import app from '../../app'
import users from '../../db/models/users'
import router from '../../routes/authroutes'
import {add, multiply} from '../../totest'
import supertest from 'supertest'
import USER from '../../models/User'
import Tokens from '../../models/token'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Math functions', () => {
  it('should multiply 5 by 3', () => {
    const result = multiply(5, 3)
    expect(result).toEqual(15)
  })
  describe('disabling account', () => {
    jest.setTimeout(20000)

    test('200 status for disabling account', async () => {
      const signUp = await request(app).post('/signup').send({
        firstName: 'Festo',
        lastName: 'kabab',
        email: 'admin1234@gmail.com',
        password: 'admin1',
      })
      console.log(signUp.body.token)

      const login = await request(app).post('/login').send({
        email: 'admin1234@gmail.com',
        password: 'admin1',
      })
      const users = await request(app).get('/users')
      console.log(users)
      const user = users.body.users[0]

      const disable = await request(app)
        .post(`/users/${user.id}/disable-account`)
        .set('Authorization', `Bearer ${login.body.token}`)
        .send()
      expect(disable.statusCode).toBe(200)
    })
    test('404 status for unexisting user', async () => {
      const login = await request(app).post('/login').send({
        email: 'admin1234@gmail.com',
        password: 'admin1',
      })
      console.log(login.body)
      const unExist = await request(app)
        .post(`/users/234567/disable-account`)
        .set('Authorization', `Bearer ${login.body.token}`)
        .send()
      console.log(unExist.body)
      expect(unExist.statusCode).toBe(404)
    })
  })
  // reset password coontroller tests
  describe('reset password', () => {
    describe('send link to email', () => {
      test('incase of unregistered email', async () => {
        const response = await supertest(app)
          .post('/resetpassword/link')
          .send({email: 'unregistered@gmail.com'})
        expect(response.status).toBe(400)
      }, 10000) // timeout 10 seconds
    })
    test('incase of a registered email', async () => {
      const response = await supertest(app)
        .post('/resetpassword/link')
        .send({email: 'josephrukundo2002@gmail.com'})
      expect(response.status).toBe(200)
    }, 20000)
    test('incase invalid email input', async () => {
      const response = await supertest(app)
        .post('/resetpassword/link')
        .send({email: 'rukundjoseph'})
      expect(response.status).toBe(400)
    }, 20000)
    describe('add token and change password', () => {
      test('incase incorrect token', async () => {
        const response = await supertest(app)
          .patch('/changepassword/josephrukundo2002@gmail.com/65328dba23')
          .send({newpassword: 'newpassword', confirmpass: 'newpassword'})
        expect(response.status).toBe(400)
      }, 20000)
      test('incase incorrect token', async () => {
        const response = await supertest(app)
          .patch('/changepassword/josephrukundo2002@gmail.com/65328dba23')
          .send({newpassword: 'newpassword', confirmpass: 'newpassword'})
        expect(response.status).toBe(400)
      }, 20000)
      test('incase of a unmatching passwords', async () => {
        const user: any = await USER.findOne({
          where: {email: 'josephrukundo2002@gmail.com'},
        })
        const token: any = await Tokens.findOne({where: {userId: `${user.id}`}})
        const response = await supertest(app)
          .patch(`/changepassword/josephrukundo2002@gmail.com/${token.token}`)
          .send({newpassword: 'newpas', confirmpass: 'newpaa'})
        expect(response.status).toBe(400)
      })
      test('incase of a valid token and email', async () => {
        const user: any = await USER.findOne({
          where: {email: 'josephrukundo2002@gmail.com'},
        })
        const token: any = await Tokens.findOne({where: {userId: `${user.id}`}})
        const response = await supertest(app)
          .patch(`/changepassword/josephrukundo2002@gmail.com/${token.token}`)
          .send({newpassword: 'newpas', confirmpass: 'newpas'})
        expect(response.status).toBe(200)
      })
    })
  })
})
