import { UserRepository } from '../ports/user-repository'
import { UserData } from '../../../entities/user-data'

export class InMemoryUserRepository implements UserRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor (private repository: UserData[]) {}

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) this.repository.push(user)
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const user = this.repository.find(usr => usr.email === email)

    return user || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    return !!(await this.findUserByEmail(user.email))
  }
}
