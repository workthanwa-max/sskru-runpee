import { usePersonnelCallUpload } from '@src/hooks/use-gcs-upload';

export function usePersonnelUpload() {
  const { progress, handleUpload, responseError } = usePersonnelCallUpload();
  return {
    progress,
    handleUpload,
    responseError,
    callImport: async () => {
      /* Handled by backend auto-import now or trigger via REST */
    },
  };
}
