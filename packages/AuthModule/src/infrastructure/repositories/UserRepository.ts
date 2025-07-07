import { UserModel } from '../models/user.model';
import { CreateUserDto } from '@auth/src/dto/user/CreateUserDto';
import { UpdateUserDto } from '@auth/src/dto/user/UpdateUserDto';

export class UserRepository {
  async getByEmail(email: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { email } });
  }

  async getById(id: string): Promise<UserModel | null> {
    return await UserModel.findByPk(id);
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    return await UserModel.create(data as any);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserModel | null> {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    return await user.update(data as any);
  }

  async delete(id: string): Promise<number> {
    return await UserModel.destroy({ where: { id } });
  }
}
