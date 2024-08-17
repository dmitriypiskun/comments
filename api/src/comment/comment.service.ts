import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentModel } from './comment.model';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

export interface CreateComment {
  commentId?: string;
  username: string;
  email: string;
  page?: string;
  text: string;
}

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userService: UserService,
  ) {}

  async getList(): Promise<CommentModel[]> {
    const comments = await this.commentRepository.getList();
    return comments.map((item) => new CommentModel(item));
  }

  async getListByCommentId(commentId: string): Promise<CommentModel[]> {
    const comments = await this.commentRepository.getList({
      parentId: commentId,
    });
    return comments.map((item) => new CommentModel(item));
  }

  async create(data: CreateComment) {
    let user: User;

    const existUsers = await this.userService.find({
      username: data.username,
      email: data.email,
    });

    if (existUsers.length) {
      user = existUsers[0];
    } else {
      user = await this.userService.create({
        username: data.username,
        email: data.email,
      });
    }

    const comment = await this.commentRepository.create({
      userId: user.id,
      parentId: data.commentId,
      text: data.text,
      page: data.page,
    });

    return new CommentModel(comment);
  }

  async delete(id: string) {
    return this.commentRepository.delete(id);
  }
}
