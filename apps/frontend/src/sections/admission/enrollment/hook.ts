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
        ...(step === EnrollmentStep.COURSE_SELECTION && {
          facultyId: true,
          programType: true,
        }),
        ...(step === EnrollmentStep.PERSONAL_INFO && {
          personalInfo: true,
        }),
        ...(step === EnrollmentStep.ADDRESS_INFO && {
          addressInfo: true,
        }),
        ...(step === EnrollmentStep.FAMILY_INFO && {
          parentInfo: true,
        }),
        ...(step === EnrollmentStep.EDUCATION_INFO && {
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
