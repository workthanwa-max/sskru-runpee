import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { System } from '@src/types/domain';
import { SystemFormSchema } from './form-schema';
import { SystemForm } from './types';

export function useSystem(system?: System | null, onCompleted?: VoidFunction) {
  const [mutateSystem, { loading }] = useRestMutation(
    system?.id ? endpoints.system.details(system.id) : endpoints.system.list,
    system?.id ? 'PUT' : 'POST'
  );

  const defaultValues = useMemo(
    (): SystemForm => ({
      active: system?.active ?? false,
      url: system?.url ?? '',
      name: system?.name ?? '',
      note: system?.note ?? '',
      loginRequired: system?.loginRequired ?? false,
    }),
    [system?.active, system?.loginRequired, system?.name, system?.note, system?.url],
  );

  const methods = useForm<SystemForm>({
    resolver: zodResolver(SystemFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await mutateSystem(data);
    onCompleted?.();
    reset();
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || loading,
    responseError: null,
    reset,
  };
}
