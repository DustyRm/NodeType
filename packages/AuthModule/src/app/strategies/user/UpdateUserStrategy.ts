import { AbstractStrategy } from '@shared/abstract/AbstractStrategy';
import NavigationContext from '@shared/navigation/NavigationContext';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';
import { UpdateUserDto } from '@auth/src/dto/user/UpdateUserDto';

export class UpdateUserStrategy extends AbstractStrategy<UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(domain: UpdateUserDto, context: NavigationContext): Promise<void> {
    const updated = await this.userRepository.update(domain.id, domain);

    if (!updated) {
      context.setError('Erro ao atualizar usuário.');
      return;
    }

    context.getNavigationResult().setResult(updated);
  }
}
