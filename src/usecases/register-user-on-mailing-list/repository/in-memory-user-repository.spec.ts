import { UserData } from '../../../entities/user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@mail.com')

    expect(user).toBe(null)
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any name'
    const email = 'any@mail.com'

    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })

    const user = await sut.findUserByEmail(email)
    expect(user.name).toBe(name)
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [
      {
        name: 'first name',
        email: 'first@mail.com'
      },
      {
        name: 'second name',
        email: 'second@mail.com'
      }
    ]

    const sut = new InMemoryUserRepository(users)
    const returnedUser = await sut.findAllUsers()

    expect(returnedUser.length).toBe(users.length)
  })
})
