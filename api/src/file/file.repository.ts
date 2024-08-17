import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { File } from './file.entity';

export interface CreateFile {
  commentId: string;
  type: string;
  name: string;
}

export type FindFileQuery = Omit<Partial<File>, 'createdAt' | 'type' | 'name'>;

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private readonly datasource: Repository<File>,
  ) {}

  getList(params?: FindFileQuery): Promise<File[]> {
    const query: FindOptionsWhere<File> = {};

    if (params?.id) {
      query.id = params.id;
    }

    if (params?.commentId) {
      query.commentId = params.commentId;
    }

    return this.datasource.find({ where: query });
  }

  create(data: CreateFile): Promise<File> {
    return this.datasource.save(data);
  }
}
