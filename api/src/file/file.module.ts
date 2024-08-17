import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileRepository, FileService],
  exports: [FileRepository, FileService],
})
export class FileModule {}
