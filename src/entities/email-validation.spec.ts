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

  test('should not accept domain larger then 255 chars', () => {
    const email = `local@${'a'.repeat(128)}.${'a'.repeat(127)}`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty domain', () => {
    const email = 'local@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain with a part larger then 63 chars', () => {
    const email = `any@${'a'.repeat(64)}.com`
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid char', () => {
    const email = 'any name@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with two dots', () => {
    const email = 'any..name@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with ending with dot', () => {
    const email = 'anyname.@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with starting with dot', () => {
    const email = '.anyname@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept email without an at-sign', () => {
    const email = '.anyname@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
