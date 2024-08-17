import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { CreateUser, FindUserQuery, UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(params: FindUserQuery): Promise<UserModel[]> {
    const users = await this.userRepository.find(params);

    if (!users.length) {
      return [];
    }

    return users.map((item) => new UserModel(item));
  }

  async create(data: CreateUser): Promise<UserModel> {
    const user = await this.userRepository.create(data);
    return new UserModel(user);
  }
}
