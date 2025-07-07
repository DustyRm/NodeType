import { Request, Response } from 'express';
import { AbstractController } from '@shared/abstract/AbstractController';
import NavigationContext from '@shared/navigation/NavigationContext';
import NavigationResult from '@shared/navigation/NavigationResult';

import { CreateUserFactory } from '@auth/src/app/factories/user/CreateUserFactory';
import { GetUserByIdFactory } from '@auth/src/app/factories/user/GetUserByIdFactory';
import { UpdateUserFactory } from '@auth/src/app/factories/user/UpdateUserFactory';
import { DeleteUserFactory } from '@auth/src/app/factories/user/DeleteUserFactory';

import { CreateUserDto } from '@auth/src/dto/user/CreateUserDto';
import { GetUserByIdDto } from '@auth/src/dto/user/GetUserByIdDto';
import { UpdateUserDto } from '@auth/src/dto/user/UpdateUserDto';
import { DeleteUserDto } from '@auth/src/dto/user/DeleteUserDto';

export class UserController extends AbstractController {
  constructor() {
    super();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleGetById = this.handleGetById.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleCreate(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const domain = new CreateUserDto({ name, email, password });
      const context = new NavigationContext(new NavigationResult());
      await new CreateUserFactory().navigate(domain, context);
      this.sendResponse(context, req, res);
    } catch (error) {
      this.errorHandler.handle(error, req, res);
    }
  }

  async handleGetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const domain = new GetUserByIdDto(id);
      const context = new NavigationContext(new NavigationResult());
      await new GetUserByIdFactory().navigate(domain, context);
      this.sendResponse(context, req, res);
    } catch (error) {
      this.errorHandler.handle(error, req, res);
    }
  }

  async handleUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const domain = new UpdateUserDto({ id, ...req.body });
      const context = new NavigationContext(new NavigationResult());
      await new UpdateUserFactory().navigate(domain, context);
      this.sendResponse(context, req, res);
    } catch (error) {
      this.errorHandler.handle(error, req, res);
    }
  }

  async handleDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const domain = new DeleteUserDto(id);
      const context = new NavigationContext(new NavigationResult());
      await new DeleteUserFactory().navigate(domain, context);
      this.sendResponse(context, req, res);
    } catch (error) {
      this.errorHandler.handle(error, req, res);
    }
  }
}
