import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

export type CreateComment = Omit<Comment, 'id' | 'createdAt'>;

export interface FindCommentQuery {
  id?: string;
  parentId?: string;
}

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly datasource: Repository<Comment>,
  ) {}

  getList(params?: FindCommentQuery): Promise<Comment[]> {
    const query: FindOptionsWhere<Comment> = {};

    if (params?.id) {
      query.id = params.id;
    }

    if (params?.parentId) {
      query.parentId = params.parentId;
    }

    return this.datasource.find({
      where: query,
      order: {
        createdAt: 'desc',
      },
    });
  }

  create(data: CreateComment): Promise<Comment> {
    return this.datasource.save(data);
  }

  async delete(id: string): Promise<void> {
    const result = await this.datasource.delete(id);

    if (!result) {
      throw new Error('Comment not found!');
    }

    return;
  }
}
