import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'src/common/types/config.type';
import { FileStorageService } from 'src/common/storage/file-storage.service';
import { DiskFileStorageService } from 'src/common/storage/disk-file-storage.service';
import { MockFileStorageService } from 'src/common/storage/mock-file-storage.service';
import { StorageController } from './storage.controller';

@Global()
@Module({
  controllers: [StorageController],
  providers: [
    DiskFileStorageService,
    MockFileStorageService,
    {
      provide: FileStorageService,
      useFactory: (configService: ConfigService<ConfigType>, disk: DiskFileStorageService, mock: MockFileStorageService) => {
        const driver = configService.get('app.storageDriver', { infer: true });
        if (driver === 'disk') return disk;
        return mock;
      },
      inject: [ConfigService, DiskFileStorageService, MockFileStorageService],
    },
  ],
  exports: [FileStorageService],
})
export class StorageModule {}
