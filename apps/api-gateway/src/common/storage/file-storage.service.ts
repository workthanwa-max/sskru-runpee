import { Injectable } from '@nestjs/common';
import { IFileStorage } from './interfaces/file-storage.interface';

@Injectable()
export abstract class FileStorageService implements IFileStorage {
  abstract getSignedUrl(fileName: string, contentType: string): Promise<{
    signedUrl: string;
    fileName: string;
    gsPath: string;
  }>;
  abstract setHoldObject(path: string): Promise<void>;
  abstract unsetHoldObject(path: string): Promise<void>;
  abstract getMovePath(sourcePath: string, destDir: string): string;
  abstract moveObject(fromPath: string, toPath: string): Promise<void>;
  abstract getDownloadUrl(path: string): Promise<string>;
  abstract readExcelFile<T = any>(path: string): Promise<T[]>;
}
