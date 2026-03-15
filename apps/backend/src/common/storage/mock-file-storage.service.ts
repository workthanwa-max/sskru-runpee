import { Injectable } from '@nestjs/common';
import { IFileStorage } from './interfaces/file-storage.interface';

@Injectable()
export class MockFileStorageService implements IFileStorage {
  async getSignedUrl(fileName: string, contentType: string) {
    console.log(`[MOCK STORAGE] Generating signed URL for: ${fileName} (${contentType})`);
    return {
      signedUrl: `http://localhost/mock-upload/${fileName}`,
      fileName: fileName,
      gsPath: `gs://mock-bucket/temp/${fileName}`,
    };
  }

  async setHoldObject(path: string): Promise<void> {
    console.log(`[MOCK STORAGE] Setting hold on: ${path}`);
  }

  async unsetHoldObject(path: string): Promise<void> {
    console.log(`[MOCK STORAGE] Unsetting hold on: ${path}`);
  }

  getMovePath(sourcePath: string, destDir: string): string {
    return `${sourcePath.replace('temp', destDir)}`;
  }

  async moveObject(fromPath: string, toPath: string): Promise<void> {
    console.log(`[MOCK STORAGE] Moving object from ${fromPath} to ${toPath}`);
  }

  async getDownloadUrl(path: string): Promise<string> {
    console.log(`[MOCK STORAGE] Getting download URL for: ${path}`);
    return `http://localhost/mock-download/${path}`;
  }

  async readExcelFile<T = any>(path: string): Promise<T[]> {
    console.log(`[MOCK STORAGE] Reading mock Excel file: ${path}`);
    return [] as T[];
  }
}
