import { left } from '../shared/Either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid email address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few chars)', () => {
    const invalidName = 'O          '
    const error = User.create({ name: invalidName, email: 'any@email.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many chars)', () => {
    const invalidName = 'O'.repeat(256)
    const error = User.create({ name: invalidName, email: 'any@email.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should create user with valid data', () => {
    const validName = 'Any Name'
    const validEmail = 'any@mail.com'

    const user = User.create({ name: validName, email: validEmail }).value as User
    expect(user.email.value).toEqual(validEmail)
    expect(user.name.value).toEqual(validName)
  })
})
