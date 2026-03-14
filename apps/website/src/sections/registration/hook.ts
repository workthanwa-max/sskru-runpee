import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormSchema } from './form-schema';
import { RegisterForm } from './types';

export function useRegister(onCompleted?: (form: RegisterForm) => void) {
  const defaultValues = useMemo(
    (): RegisterForm => ({
      firstname: '',
      lastname: '',
      personnelId: '',
      facultyId: '',
      password: '',
      phone: '',
      confirmPassword: '',
    }),
    [],
  );

  const methods = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    //
    onCompleted?.(data);
    console.info('DATA', data);
    reset();
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting,
    responseError: undefined,
    reset,
  };
}
