import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')

    expect(user).toBe(null)
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any name'
    const email = 'any@mail.com'

    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name, email })

    const user = await userRepo.findUserByEmail(email)
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

    const userRepo = new InMemoryUserRepository(users)
    const returnedUser = await userRepo.findAllUsers()

    expect(returnedUser.length).toBe(users.length)
  })
})
