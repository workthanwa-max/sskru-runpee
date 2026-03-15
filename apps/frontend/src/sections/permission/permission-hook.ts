import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Permission } from '@src/types/domain';
import { PermissionFormSchema } from './form-schema';
import { PermissionForm } from './types';

// ------------------------------------------------

export function usePermission(permission?: Permission | null, onCompleted?: (info: Permission) => void) {
  const [createPermission, { loading: creating }] = useRestMutation(endpoints.permission.list, 'POST');
  const [updatePermission, { loading: updating }] = useRestMutation(
    permission?.id ? endpoints.permission.details(permission.id) : '',
    'PUT'
  );
  const [assignPermissionSystems, { loading: assigning }] = useRestMutation(
    permission?.id ? endpoints.permission.systems(permission.id) : '',
    'POST'
  );

  const defaultValues = useMemo(
    (): PermissionForm => ({
      name: permission?.name ?? '',
      systemIds: permission?.systems?.map((s) => s.id) ?? [],
    }),
    [permission?.name, permission?.systems]
  );

  const methods = useForm<PermissionForm>({
    resolver: zodResolver(PermissionFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let result: any;
      if (permission?.id) {
        const hasSystemIdsChanged =
          JSON.stringify(defaultValues.systemIds?.sort()) !== JSON.stringify(data.systemIds?.sort());

        if (data.systemIds && hasSystemIdsChanged) {
          await assignPermissionSystems({ systemIds: data.systemIds });
        }

        result = await updatePermission({ name: data.name });
      } else {
        result = await createPermission(data);
      }

      if (result) {
        onCompleted?.(result);
      }
      reset();
    } catch (error) {
      console.error('Submit error:', error);
    }
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || creating || updating || assigning,
    responseError: null,
    reset,
  };
}
