import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';

export interface CreateUser {
  username: string;
  email: string;
}

export type FindUserQuery = Omit<Partial<User>, 'createdAt'>;

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly datasource: Repository<User>,
  ) {}

  find(params?: FindUserQuery): Promise<User[]> {
    const query: FindOptionsWhere<User> = {};

    if (params?.id) {
      query.id = params.id;
    }

    if (params?.email) {
      query.email = params.email;
    }

    if (params?.username) {
      query.username = params.username;
    }

    return this.datasource.find({ where: query });
  }

  create(data: CreateUser): Promise<User> {
    return this.datasource.save(data);
  }
}
