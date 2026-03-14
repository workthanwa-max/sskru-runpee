import { zodResolver } from '@hookform/resolvers/zod';
import { usePersonnelCallUpload } from '@src/hooks/use-gcs-upload';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { ActivityBudget } from '@src/types/domain';
import { initialFormValues } from './constant';
import { CurriculumReqBudgetFormSchema } from './schema';
import { CurriculumReqBudgetForm } from './types';

export type CurriculumBudgetInfo = Partial<ActivityBudget> & { id: string };

export function useCurriculumReqBudget(raw: CurriculumBudgetInfo, onCompleted?: VoidFunction) {
  const { handleUpload, responseError } = usePersonnelCallUpload();
  const [callSubmitBudgetInfo, { loading }] = useRestMutation(endpoints.curriculum.budget(raw.id), 'POST');
  const [attachFile, setAttachFile] = useState<File | string | null>(null);

  const defaultValues = useMemo(
    (): CurriculumReqBudgetForm => ({
      activityId: raw.id,
      minimumRegister: raw.minimumRegister ?? initialFormValues.minimumRegister,
      hasFee: Number(raw.fee) > 0 ? '1' : '0',
      fee: raw.fee ?? initialFormValues.fee,
      expenseEstimates: [], // Assuming this is handled or ignored for now as in old code
      applicantQualifications:
        raw.applicantQualifications?.map((item) => ({
          condition: item,
        })) ?? initialFormValues.applicantQualifications,
      applicantQualificationConditions:
        raw.applicantQualificationConditions?.map((item) => ({
          condition: item,
        })) ?? initialFormValues.applicantQualificationConditions,
      attachFile: raw.attachFile ?? initialFormValues.attachFile,
    }),
    [
      raw.applicantQualificationConditions,
      raw.applicantQualifications,
      raw.attachFile,
      raw.fee,
      raw.id,
      raw.minimumRegister,
    ],
  );

  const methods = useForm<CurriculumReqBudgetForm>({
    resolver: zodResolver(CurriculumReqBudgetFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    control,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (!attachFile) {
      alert('กรุณาอัพโหลดไฟล์');
      return;
    }

    let gsPath: string | undefined = undefined;

    if (attachFile instanceof File) {
      const uploaded = await handleUpload(attachFile);
      if (uploaded?.gsPath) {
        gsPath = uploaded?.gsPath;
      }
    } else if (typeof attachFile === 'string') {
      gsPath = attachFile;
    }

    await callSubmitBudgetInfo({
      applicantQualificationConditions: data.applicantQualificationConditions.map((d) => d.condition),
      applicantQualifications: data.applicantQualifications.map((d) => d.condition),
      expenseEstimates: data.expenseEstimates,
      fee: data.hasFee === '1' ? data.fee : 0,
      minimumRegister: data.minimumRegister,
      attachFile: gsPath,
    });

    onCompleted?.();
    reset();
    setAttachFile(null);
  });

  const expenseEstimateInput = useFieldArray({ control, name: 'expenseEstimates' });
  const applicantQualificationConditionInput = useFieldArray({ control, name: 'applicantQualificationConditions' });
  const applicantQualificationInput = useFieldArray({ control, name: 'applicantQualifications' });

  return {
    attachFile,
    setAttachFile,
    expenseEstimateInput,
    applicantQualificationConditionInput,
    applicantQualificationInput,
    onSubmit,
    methods,
    submitting: isSubmitting || loading,
    formErrors: errors,
    errors: responseError,
    reset,
    watch,
  };
}
