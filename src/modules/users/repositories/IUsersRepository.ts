import User from '../infra/typeorm/entities/User'
import IUserDTO from '../dtos/IUserDTO'
import IListProvidersDTO from '../dtos/IListProvidersDTO'

interface IUsersRepository {
  findAllProviders(filters: IListProvidersDTO): Promise<User[]>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: IUserDTO): Promise<User>
  save(user: User): Promise<User>
}

export default IUsersRepository
