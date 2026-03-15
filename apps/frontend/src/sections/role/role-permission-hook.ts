import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRestMutation, useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Role, Permission } from '@src/types/domain';
import { RolePermissionFormSchema } from './form-schema';
import { RolePermissionForm } from './types';

export function useRolePermission(role: Role, onCompleted?: VoidFunction) {
  const [createPermission, { loading: creating }] = useRestMutation(endpoints.permission.list, 'POST');
  const [assignRolePermissions, { loading: assigning }] = useRestMutation(
    endpoints.role.permissions(role.id),
    'POST'
  );

  const { data: allPermissions } = useRestQuery<Permission[]>(endpoints.permission.list);
  const roleId = role.id;

  const defaultValues: RolePermissionForm = {
    roleId,
    permissionName: '',
  };

  const permissions = allPermissions?.filter((p) => !role.permissions?.some((rp) => rp.id === p.id)) ?? [];
  const permissionNames = new Map(permissions?.map((p) => [p.name, p]));

  const methods = useForm<RolePermissionForm>({
    resolver: zodResolver(RolePermissionFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const permissionIds = role.permissions?.map((p) => p.id) ?? [];
      let permissionId = permissionNames.get(data.permissionName)?.id;

      if (!permissionId) {
        const resp = await createPermission({ name: data.permissionName });
        permissionId = resp.id;
      }

      if (permissionId) {
        permissionIds.push(permissionId);
        await assignRolePermissions({
          permissionIds: permissionIds,
        });
      }

      onCompleted?.();
      reset();
    } catch (error) {
      console.error('Submit role permission error:', error);
    }
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || creating || assigning,
    responseError: null,
    permissions,
    reset,
  };
}
