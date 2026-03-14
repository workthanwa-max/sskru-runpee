import axiosInstance, { endpoints } from '@src/utils/axios';

export async function uploadFile(path: string, file: File) {
  const response = await axiosInstance.put(`${endpoints.storage.upload}?path=${encodeURIComponent(path)}`, file, {
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  });
  return response.data;
}

export function getSingedUrl(path: string) {
  return `${endpoints.storage.file}/${path}`;
}
