import {
    Controller,
    Get,
    Put,
    Param,
    Query,
    Req,
    Res,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import * as path from 'path';
import { ConfigType } from 'src/common/types/config.type';

@Controller('storage')
export class StorageController {
  private readonly logger = new Logger(StorageController.name);
  private readonly storagePath: string;

  constructor(private readonly configService: ConfigService<ConfigType>) {
    this.storagePath = this.configService.getOrThrow('app.diskStoragePath', { infer: true });
  }

  @Put('upload')
  async upload(@Query('path') relativePath: string, @Req() req: Request) {
    if (!relativePath) {
      throw new HttpException('Path query parameter is required', HttpStatus.BAD_REQUEST);
    }

    const fullPath = path.join(this.storagePath, decodeURIComponent(relativePath));
    
    // Safety check: ensure the path is within the storage directory
    if (!fullPath.startsWith(path.resolve(this.storagePath))) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    try {
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      
      const fileHandle = await fs.open(fullPath, 'w');
      const writeStream = fileHandle.createWriteStream();
      
      await new Promise((resolve, reject) => {
        req.pipe(writeStream);
        req.on('end', resolve);
        req.on('error', reject);
      });
      
      await fileHandle.close();
      
      return { success: true, path: relativePath };
    } catch (err) {
      this.logger.error(`Upload failed for ${relativePath}`, err);
      throw new HttpException('Upload failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('file/:path*')
  async getFile(@Param('path') p: string, @Param('0') rest: string, @Res() res: Response) {
    const relativePath = p + (rest || '');
    const fullPath = path.join(this.storagePath, decodeURIComponent(relativePath));

    if (!fullPath.startsWith(path.resolve(this.storagePath))) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    try {
      await fs.access(fullPath);
      const fileStream = createReadStream(fullPath);
      fileStream.pipe(res);
    } catch (err) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }
}
