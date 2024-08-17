import { Injectable } from '@nestjs/common';
import { FileRepository, FindFileQuery } from './file.repository';
import { FileModel } from './file.model';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async getList(query: FindFileQuery): Promise<FileModel[]> {
    const files = await this.fileRepository.getList(query);
    return files.length ? files.map((item) => new FileModel(item)) : [];
  }

  async create(data: any): Promise<FileModel> {
    const file = await this.fileRepository.create(data);
    return new FileModel(file);
  }
}
