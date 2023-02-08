// TODO replace the test below with your tests
import {add, multiply} from '../../totest'

import request from 'supertest'
import app from '../../app'
// import auth from '../authController'

describe('Test the logout route', () => {
  test('It should logout the user and return status 200 and message "Logged out"', async () => {
    const response = await request(app).get('/logout')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({status: 200, message: 'Logged out'})
  })
})

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
