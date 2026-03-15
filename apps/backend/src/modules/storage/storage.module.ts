import { Module, Global } from '@nestjs/common';
import { FileStorageService } from 'src/common/storage/file-storage.service';
import { DiskFileStorageService } from 'src/common/storage/disk-file-storage.service';
import { StorageController } from './storage.controller';

@Global()
@Module({
  controllers: [StorageController],
  providers: [
    DiskFileStorageService,
    {
      provide: FileStorageService,
      useClass: DiskFileStorageService,
    },
  ],
  exports: [FileStorageService],
})
export class StorageModule {}
