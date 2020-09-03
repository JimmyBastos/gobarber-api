import { container } from 'tsyringe'

import IHashProvider from './HashProvider/contracts/IHashProvider'
import BCryptHashProvider from './HashProvider/implementations/BCriptHashProvider'

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider
)
