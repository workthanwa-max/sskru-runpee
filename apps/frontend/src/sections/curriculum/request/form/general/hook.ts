import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { ActivityGeneral } from '@src/types/domain';
import { CurriculumReqGeneralFormSchema } from './schema';
import { CurriculumReqGeneralForm } from './types';

export type CurriculumReqGeneralInfo = Partial<ActivityGeneral> & { id: string };

export function useCurriculumReqGeneral(raw: CurriculumReqGeneralInfo, onCompleted?: VoidFunction) {
  const [callSubmitGeneral, { loading }] = useRestMutation(endpoints.curriculum.general(raw.id), 'POST');

  const defaultValues = useMemo(
    (): CurriculumReqGeneralForm => ({
      activityId: raw.id,
      general: {
        type: raw.type ?? '',
        ref: raw.ref ?? '',
        nameTH: raw.nameTH ?? '',
        nameEN: raw.nameEN ?? '',
        attributes: raw.attributes ?? [],
      },
      type: raw.type ?? '',
      model: raw.model ?? '',
      benefits: raw.benefits ?? [],
    }),
    [raw.benefits, raw.id, raw.model, raw.nameEN, raw.nameTH, raw.ref, raw.type, raw.attributes],
  );

  const methods = useForm<CurriculumReqGeneralForm>({
    resolver: zodResolver(CurriculumReqGeneralFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await callSubmitGeneral({
      benefits: data.benefits,
      general: {
        nameEN: data.general.nameEN,
        nameTH: data.general.nameTH,
        ref: data.general.ref,
        type: data.general.type,
        attributes: data.general.attributes ?? [],
      },
      model: data.model,
      type: data.type,
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
