/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import { useCallback, useState } from 'react';
import axiosInstance, { endpoints } from '@src/utils/axios';

interface UploadProgress {
  progress: number;
  isUploading: boolean;
}

interface UseFileUploadReturn {
  upload: (uploadUrl: string, file: File) => Promise<void>;
  progress: UploadProgress;
  error: string | null;
  reset: () => void;
}

interface UseFileUploadConfig {
  onCompleted?: () => void;
  onError?: (error: any) => void;
}

export const useFileUpload = (config?: UseFileUploadConfig): UseFileUploadReturn => {
  const { onCompleted, onError } = config || {};

  const [progress, setProgress] = useState<UploadProgress>({
    progress: 0,
    isUploading: false,
  });
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setProgress({ progress: 0, isUploading: false });
    setError(null);
  }, []);

  const upload = useCallback(
    async (uploadUrl: string, file: File) => {
      try {
        setError(null);
        setProgress({ progress: 0, isUploading: true });

        // Using standard axios for the actual file PUT/POST to the signed URL (or local disk endpoint)
        await axios.put(uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0));
            setProgress({ progress, isUploading: true });
          },
        });

        setProgress({ progress: 100, isUploading: false });
        onCompleted?.();
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'Upload failed';
        setError(errorMessage);
        setProgress({ progress: 0, isUploading: false });
        onError?.(err);
        throw new Error(errorMessage);
      }
    },
    [onCompleted, onError]
  );

  return {
    upload,
    progress,
    error,
    reset,
  };
};

// Aliases for compatibility
export const useGCSUpload = useFileUpload;

export function usePersonnelCallUpload() {
  const { upload, progress } = useFileUpload({
    onCompleted: () => console.log('Success:'),
    onError: (error) => console.error('Error:', error),
  });

  const [error, setError] = useState<any>(null);

  const handleUpload = async (file: File) => {
    try {
      const response = await axiosInstance.get(endpoints.personnel.uploadUrl, {
        params: { filePath: file.name, contentType: file.type },
      });
      const { uploadURL, gsPath } = response.data;
      if (uploadURL) {
        await upload(uploadURL, file);
      }
      return { uploadURL, gsPath };
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    progress,
    handleUpload,
    responseError: error,
  };
}

export function useCurriculumCallUpload() {
  const { upload, progress } = useFileUpload({
    onCompleted: () => console.log('Upload completed'),
    onError: (error) => console.error('Upload Error:', error),
  });

  const [error, setError] = useState<any>(null);

  const handleUpload = async (file: File) => {
    try {
      const response = await axiosInstance.get(endpoints.curriculum.uploadUrl, {
        params: { fileName: file.name, contentType: file.type },
      });
      const { uploadURL, gsPath } = response.data;
      if (uploadURL) {
        await upload(uploadURL, file);
      }
      return { uploadURL, gsPath };
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    progress,
    handleUpload,
    responseError: error,
  };
}
