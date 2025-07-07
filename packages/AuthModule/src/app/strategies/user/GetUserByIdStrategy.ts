import { AbstractStrategy } from '@shared/abstract/AbstractStrategy';
import NavigationContext from '@shared/navigation/NavigationContext';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';

export class GetUserByIdStrategy extends AbstractStrategy<{ id: string }> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(domain: { id: string }, context: NavigationContext): Promise<void> {
    const user = await this.userRepository.getById(domain.id);

    if (!user) {
      context.setError('Usuário não encontrado.');
      return;
    }

    context.getNavigationResult().setResult(user);
  }
}
