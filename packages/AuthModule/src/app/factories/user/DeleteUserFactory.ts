import { AbstractFactory } from '@shared/abstract/AbstractFactory';
import { DeleteUserStrategy } from '@auth/src/app/strategies/user/DeleteUserStrategy';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';

export class DeleteUserFactory extends AbstractFactory<{ id: string }> {
  constructor() {
    super();

    const repo = new UserRepository();
    this.setActions([
      new DeleteUserStrategy(repo)
    ]);
  }
}
