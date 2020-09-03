import { uuid } from 'uuidv4'

import User from '@modules/users/infra/typeorm/entities/User'
import IUserDTO from '@modules/users/dtos/IUserDTO'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findById (id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)

    return user
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)

    return user
  }

  public async create ({ name, email, password }: IUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password
    })

    this.save(user)

    return user
  }

  public async save (user: User): Promise<User> {
    const foundUserIndex = this.users.findIndex(
      savedUser => savedUser.id === user.id
    )

    if (foundUserIndex === -1) {
      this.users.push(user)
    } else {
      this.users[foundUserIndex] = user
    }

    return user
  }
}

export default FakeUsersRepository
