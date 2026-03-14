export interface IFileStorage {
  getSignedUrl(fileName: string, contentType: string): Promise<{
    signedUrl: string;
    fileName: string;
    gsPath: string;
  }>;
  setHoldObject(path: string): Promise<void>;
  unsetHoldObject(path: string): Promise<void>;
  getMovePath(sourcePath: string, destDir: string): string;
  moveObject(fromPath: string, toPath: string): Promise<void>;
  getDownloadUrl(path: string): Promise<string>;
  readExcelFile<T = any>(path: string): Promise<T[]>;
}
