// CreateUserStrategy.ts
import { AbstractStrategy } from '@shared/abstract/AbstractStrategy';
import NavigationContext from '@shared/navigation/NavigationContext';
import { CreateUserDto } from '@auth/src/dto/user/CreateUserDto';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';
import * as bcrypt from 'bcrypt';

export class CreateUserStrategy extends AbstractStrategy<CreateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(domain: CreateUserDto, navigationContext: NavigationContext): Promise<void> {
    const { name, email, password } = domain;

    if (!name || !email || !password) {
      navigationContext.setError('Nome, email e senha são obrigatórios.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!createdUser) {
      navigationContext.setError('Erro ao criar usuário.');
      return;
    }

    delete (createdUser as any).password;
    navigationContext.getNavigationResult().setResult(createdUser);
  }
}
