import { zodResolver } from '@hookform/resolvers/zod';
import { useCurriculumCallUpload } from '@src/hooks/use-gcs-upload';
import { convertUrlToGsPath, isGsPath } from '@src/utils/file';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { CourseImplementationStep } from '@src/types/domain';
import { initialFormValues } from './const';
import { CurriculumApproveFormSchema } from './schema';
import { CurriculumApproveForm } from './types';

export function useCurriculumApprove(
  raw: Partial<CurriculumApproveForm> & { activityId: string },
  onCompleted?: VoidFunction,
) {
  const [callSubmit, { loading }] = useRestMutation(
    endpoints.curriculum.implementation(raw.activityId),
    'POST'
  );

  const defaultValues = useMemo(
    (): CurriculumApproveForm => ({
      ...initialFormValues,
      ...raw,
    }),
    [raw],
  );

  const methods = useForm<CurriculumApproveForm>({
    resolver: zodResolver(CurriculumApproveFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = methods;

  const { handleUpload } = useCurriculumCallUpload();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const attachFiles: string[] = data.attachFiles
        ? await Promise.all(
            data.attachFiles.map(async (att) => {
              if (att instanceof File) {
                const result = await handleUpload(att);
                return result.gsPath;
              }
              if (isGsPath(att)) {
                return att;
              }
              return convertUrlToGsPath(att);
            }),
          )
        : [];

      await callSubmit({
        agenda: data.agenda,
        approve: data.approve === '1',
        time: data.time,
        title: data.title,
        note: data.note,
        attachFiles: attachFiles,
        step: data.step as CourseImplementationStep,
      });

      onCompleted?.();
      reset();
    } catch (error) {
      console.error('Submit approval error:', error);
    }
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || loading,
    formErrors: errors,
    errors: null,
    reset,
    watch,
    loading,
  };
}
