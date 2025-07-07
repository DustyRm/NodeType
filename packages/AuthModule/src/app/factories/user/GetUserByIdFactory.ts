import { AbstractFactory } from '@shared/abstract/AbstractFactory';
import { GetUserByIdStrategy } from '@auth/src/app/strategies/user/GetUserByIdStrategy';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';

export class GetUserByIdFactory extends AbstractFactory<{ id: string }> {
  constructor() {
    super();

    const repo = new UserRepository();
    this.setActions([
      new GetUserByIdStrategy(repo)
    ]);
  }
}
