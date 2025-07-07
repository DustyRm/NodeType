import { AbstractFactory } from '@shared/abstract/AbstractFactory';
import { CreateUserStrategy } from '../../strategies/user/CreateUserStrategy';
import { ValidateEmailStrategy } from '../../strategies/user/ValidateEmailStrategy';
import { UserRepository } from '@auth/src/infrastructure/repositories/UserRepository';
import { CreateUserDto } from '@auth/src/dto/user/CreateUserDto';

export class CreateUserFactory extends AbstractFactory<CreateUserDto> {
  constructor() {
    super();

    const repository = new UserRepository();

    this.setActions([
      new ValidateEmailStrategy(repository),
      new CreateUserStrategy(repository),
    ]);
  }
}
