// ValidateEmailStrategy.ts
import { AbstractStrategy } from '../../../../../shared/abstract/AbstractStrategy';
import NavigationContext from '../../../../../shared/navigation/NavigationContext';
import { CreateUserDto } from '@auth/src/dto/user/CreateUserDto';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';

export class ValidateEmailStrategy extends AbstractStrategy<CreateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(domain: CreateUserDto, navigationContext: NavigationContext): Promise<void> {
    const { email } = domain;

    if (!email) {
      navigationContext.setError('Email é obrigatório.');
      return;
    }

    const userFound = await this.userRepository.getByEmail(email);

    if (userFound) {
      navigationContext.setError('Email já cadastrado.');
    }
  }
}
