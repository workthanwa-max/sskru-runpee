import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EnrollmentStep } from '../constant';
import { FORM_PERSIST_KEY, initialFormValues } from './constant';
import { EnrollmentFormSchema } from './schema';
import { EnrollmentForm } from './types';

export function useEnrollment(step: EnrollmentStep, onCompleted?: (form: unknown) => void) {
  const sessionFormValues = sessionStorage.getItem(FORM_PERSIST_KEY);

  const defaultValues = useMemo(
    (): EnrollmentForm =>
      sessionFormValues
        ? {
            ...JSON.parse(sessionFormValues),
          }
        : {
            ...initialFormValues,
          },
    [sessionFormValues],
  );

  const methods = useForm({
    resolver: zodResolver(
      EnrollmentFormSchema.pick({
        ...(step === EnrollmentStep.APPLICANT_INFO && {
          facultyId: true,
          personalInfo: true,
          addressInfo: true,
        }),
        ...(step === EnrollmentStep.PARENT_INFO && {
          parentInfo: true,
        }),
        ...(step === EnrollmentStep.ATTACH_DOCUMENTS && {
          qualification: true,
        }),
      }),
    ),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;
  console.log(errors);

  const onSubmit = handleSubmit(async (data) => {
    //
    onCompleted?.(data);
    console.info('DATA', data);
    // reset();
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting,
    responseError: undefined,
    reset,
    setValue,
    watch,
    getValues,
  };
}
