import { left } from '../shared/Either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { User } from './User'

describe('User domain entity', () => {
  test('should not create user with invalid email address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })
})
