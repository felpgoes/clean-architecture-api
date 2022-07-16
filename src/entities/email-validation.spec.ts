import { Email } from './email'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should accept valid email', () => {
    const email = 'felipe@teste.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept local part larger then 64 chars', () => {
    const localPart = 'a'.repeat(65)
    const email = `${localPart}@mail.com`
    expect(Email.validate(email)).toBeFalsy()
  })
})
