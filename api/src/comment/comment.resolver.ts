import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentModel, CreateCommentDto } from './comment.model';
import { CommentService } from './comment.service';
import { UserModel } from 'src/user/user.model';
import { FileModel } from 'src/file/file.model';
import { UserService } from 'src/user/user.service';
import { FileService } from 'src/file/file.service';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Query(() => [CommentModel], { nullable: true })
  async comments(): Promise<CommentModel[]> {
    return this.commentService.getList();
  }

  @Mutation(() => CommentModel)
  async createComment(
    @Args('data') data: CreateCommentDto,
  ): Promise<CommentModel> {
    return this.commentService.create(data);
  }

  @Mutation(() => CommentModel)
  async deleteComment(@Args('id') id: string): Promise<void> {
    return this.commentService.delete(id);
  }

  @ResolveField()
  async children(@Parent() comment: CommentModel): Promise<CommentModel[]> {
    const { id } = comment;
    return this.commentService.getListByCommentId(id);
  }

  @ResolveField()
  async author(@Parent() comment: CommentModel): Promise<UserModel> {
    const { authorId } = comment;
    const users = await this.userService.find({ id: authorId });
    return users[0];
  }

  @ResolveField(() => FileModel, { nullable: true })
  async file(@Parent() comment: CommentModel): Promise<FileModel | null> {
    const { id } = comment;
    const files = await this.fileService.getList({ commentId: id });
    return files.length ? files[0] : null;
  }
}
