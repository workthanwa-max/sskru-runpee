import { zodResolver } from '@hookform/resolvers/zod';
import { useCurriculumCallUpload } from '@src/hooks/use-gcs-upload';
import { convertUrlToGsPath, isGsPath } from '@src/utils/file';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { ActivityGeneral } from '@src/types/domain';
import { CurriculumReqGeneralDegreeFormSchema } from './schema';
import { CurriculumReqGeneralDegreeForm } from './types';

export type CurriculumReqGeneralDegreeInfo = Partial<ActivityGeneral> & { id: string };

export function useCurriculumReqGeneralDegree(raw: CurriculumReqGeneralDegreeInfo, onCompleted?: VoidFunction) {
  const [callSubmitGeneral, { loading }] = useRestMutation(endpoints.curriculum.general(raw.id), 'POST');

  const defaultValues = useMemo(
    (): CurriculumReqGeneralDegreeForm => ({
      activityId: raw.id,
      general: {
        ref: raw.ref ?? '',
        nameTH: raw.nameTH ?? '',
        nameEN: raw.nameEN ?? '',
        attributes: raw.attributes ?? [],
      },
    }),
    [raw.ref, raw.nameTH, raw.nameEN, raw.attributes, raw.id],
  );

  const methods = useForm<CurriculumReqGeneralDegreeForm>({
    resolver: zodResolver(CurriculumReqGeneralDegreeFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const { handleUpload } = useCurriculumCallUpload();

  const onSubmit = handleSubmit(async (data) => {
    const attributes: string[] = await Promise.all(
      data.general.attributes.map(async (att) => {
        if (att instanceof File) {
          const result = await handleUpload(att);
          return result.gsPath;
        }
        if (isGsPath(att)) {
          return att;
        }
        return convertUrlToGsPath(att);
      }),
    );
    await callSubmitGeneral({
      general: {
        nameEN: data.general.nameEN,
        nameTH: data.general.nameTH,
        ref: data.general.ref,
        attributes,
        type: 'DEGREE',
      },
    });
    onCompleted?.();
    reset();
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || loading,
    formErrors: errors,
    errors: null,
    reset,
    setValue,
  };
}
