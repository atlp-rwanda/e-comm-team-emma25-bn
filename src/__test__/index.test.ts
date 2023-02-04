// TODO replace the test below with your tests
import {add, multiply} from '../totest'

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
