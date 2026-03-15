import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { PersonnelRolesFormSchema } from './form-schema';
import type { PersonnelRolesForm } from './types';

export function usePersonnelRoles(item: PersonnelRolesForm, onCompleted?: VoidFunction) {
  const [assign, { loading }] = useRestMutation(endpoints.personnel.roles(item.personnelId), 'PUT');

  const defaultValues = useMemo(
    (): PersonnelRolesForm => ({
      personnelId: item?.personnelId ?? '',
      roleIds: item.roleIds ?? [],
    }),
    [item?.personnelId, item.roleIds],
  );

  const methods = useForm<PersonnelRolesForm>({
    resolver: zodResolver(PersonnelRolesFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await assign({ roleIds: data.roleIds });
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
