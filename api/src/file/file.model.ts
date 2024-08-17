import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { File } from './file.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@ObjectType()
export class FileModel {
  @Field()
  id: string;

  @Field()
  commentId: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  createdAt: Date;

  constructor(data: File) {
    this.id = data.id;
    this.commentId = data.commentId;
    this.name = data.name;
    this.type = data.type;
    this.createdAt = data.createdAt;
  }
}

@InputType()
export class UploadFileDto {
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}
