import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [UserModule, FileModule, TypeOrmModule.forFeature([Comment])],
  providers: [
    UserService,
    FileService,
    CommentService,
    CommentRepository,
    CommentResolver,
  ],
})
export class CommentModule {}
