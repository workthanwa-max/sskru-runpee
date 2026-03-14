import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 } from 'uuid';
import * as XLSX from 'xlsx';
import { ConfigType } from '../types/config.type';
import { IFileStorage } from './interfaces/file-storage.interface';

@Injectable()
export class DiskFileStorageService implements IFileStorage {
  private readonly logger = new Logger(DiskFileStorageService.name);
  private readonly storagePath: string;
  private readonly host: string;
  private readonly port: number;

  constructor(private readonly configService: ConfigService<ConfigType>) {
    this.storagePath = this.configService.getOrThrow('app.diskStoragePath', { infer: true });
    this.host = this.configService.getOrThrow('app.host', { infer: true });
    this.port = this.configService.getOrThrow('app.port', { infer: true });
    
    // Ensure storage path exists
    this.ensureDirectoryExists(this.storagePath);
  }

  private async ensureDirectoryExists(dir: string) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (err) {
      this.logger.error(`Failed to create directory ${dir}`, err);
    }
  }

  async getSignedUrl(fileName: string, contentType: string) {
    const fileExtension = path.extname(fileName);
    const tempDir = 'temp';
    const randomFileName = `${v4()}|SPLIT|${fileName}`;
    
    await this.ensureDirectoryExists(path.join(this.storagePath, tempDir));

    // For disk storage, "signedUrl" is just an upload endpoint on our server
    const uploadUrl = `http://${this.host}:${this.port}/storage/upload?path=${tempDir}/${encodeURIComponent(randomFileName)}`;

    return {
      signedUrl: uploadUrl,
      fileName,
      gsPath: `disk://${tempDir}/${randomFileName}`,
    };
  }

  async setHoldObject(filePath: string) {
    // Disk implementation doesn't strictly need hold, but we could implement locking if needed
    this.logger.log(`Set hold on ${filePath}`);
  }

  async unsetHoldObject(filePath: string) {
    this.logger.log(`Unset hold on ${filePath}`);
  }

  getMovePath(sourcePath: string, destDir: string) {
    const fileName = path.basename(sourcePath);
    return `disk://${destDir}/${fileName}`;
  }

  async moveObject(fromPath: string, toPath: string) {
    const sourceRelative = fromPath.replace('disk://', '');
    const destRelative = toPath.replace('disk://', '');
    
    const sourceFull = path.join(this.storagePath, sourceRelative);
    const destFull = path.join(this.storagePath, destRelative);

    await this.ensureDirectoryExists(path.dirname(destFull));
    await fs.rename(sourceFull, destFull);
  }

  async getDownloadUrl(filePath: string) {
    const relativePath = filePath.replace('disk://', '');
    return `http://${this.host}:${this.port}/storage/file/${encodeURIComponent(relativePath)}`;
  }

  async readExcelFile<T = any>(filePath: string): Promise<T[]> {
    const relativePath = filePath.replace('disk://', '');
    const fullPath = path.join(this.storagePath, relativePath);
    
    const buffer = await fs.readFile(fullPath);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    return XLSX.utils.sheet_to_json(sheet) as T[];
  }
}
