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

  test('should not accept strings larger then 320 chars', () => {
    const email = `${'a'.repeat(64)}@${'b'.repeat(128)}.${'c'.repeat(127)}`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part larger then 64 chars', () => {
    const localPart = 'a'.repeat(65)
    const email = `${localPart}@mail.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain part larger then 255 chars', () => {
    const email = `local@${'a'.repeat(128)}.${'a'.repeat(127)}`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@$mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
