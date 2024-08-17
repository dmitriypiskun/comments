import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { UserModel } from 'src/user/user.model';
import { FileModel } from 'src/file/file.model';

@ObjectType()
export class CommentModel {
  @Field()
  id: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field()
  authorId: string;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field(() => [CommentModel], { nullable: true })
  children?: CommentModel[];

  @Field(() => UserModel)
  author: UserModel;

  @Field(() => FileModel, { nullable: true })
  file?: FileModel;

  constructor(data: Comment) {
    this.id = data.id;
    this.authorId = data.userId;
    this.parentId = data.parentId;
    this.text = data.text;
    this.createdAt = data.createdAt;
  }
}

@InputType()
export class CreateCommentDto {
  @Field({ nullable: true })
  commentId?: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  page?: string;

  @Field()
  text: string;
}
