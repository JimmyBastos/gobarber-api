import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserDTO from '@modules/users/dtos/IUserDTO'
import User from '../entities/User'
import { Repository, getRepository } from 'typeorm'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user
  }

  public async create({ name, email, password }: IUserDTO): Promise<User> {

    const user = this.ormRepository.create({
      name,
      email,
      password
    })

    await this.ormRepository.save(user)

    return user
  }

  public save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

}

export default UsersRepository
