import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Role, RoleType } from '@src/types/domain';
import { RoleFormSchema } from './form-schema';
import { RoleForm } from './types';

export function useRole(role?: Role | null, onCompleted?: VoidFunction) {
  const [createRole, { loading: creating }] = useRestMutation(endpoints.role.list, 'POST');
  const [updateRole, { loading: updating }] = useRestMutation(
    role?.id ? endpoints.role.details(role.id) : '',
    'PUT'
  );

  const defaultValues = useMemo(
    (): RoleForm => ({
      name: role?.name ?? '',
      type: role?.type ?? RoleType.PERSONNEL,
    }),
    [role?.name, role?.type]
  );

  const methods = useForm<RoleForm>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (role?.id) {
        await updateRole(data);
      } else {
        await createRole(data);
      }
      onCompleted?.();
      reset();
    } catch (error) {
      console.error('Submit role error:', error);
    }
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || creating || updating,
    responseError: null,
    reset,
  };
}
