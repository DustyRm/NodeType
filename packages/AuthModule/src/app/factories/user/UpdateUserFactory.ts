import { AbstractFactory } from '@shared/abstract/AbstractFactory';
import { UpdateUserStrategy } from '@auth/src/app/strategies/user/UpdateUserStrategy';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';

export class UpdateUserFactory extends AbstractFactory<any> {
  constructor() {
    super();

    const repo = new UserRepository();
    this.setActions([
      new UpdateUserStrategy(repo)
    ]);
  }
}
