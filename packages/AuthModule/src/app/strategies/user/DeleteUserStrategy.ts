import { AbstractStrategy } from '@shared/abstract/AbstractStrategy';
import NavigationContext from '@shared/navigation/NavigationContext';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';

export class DeleteUserStrategy extends AbstractStrategy<{ id: string }> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(domain: { id: string }, context: NavigationContext): Promise<void> {
    const deletedCount = await this.userRepository.delete(domain.id);

    if (deletedCount === 0) {
      context.setError('Usuário não encontrado ou já removido.');
      return;
    }

    context.getNavigationResult().setResult({ success: true });
  }
}
