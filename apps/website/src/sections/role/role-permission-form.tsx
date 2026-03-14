import { Button, Flex, Modal, ModalProps } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFAutocomplete from '@src/components/hook-form/rhf-autocomplete';
import { Role } from '@src/types/domain';
import { useRolePermission } from './role-permission-hook';

type Props = {
  onCompleted: VoidFunction;
  role: Role;
};
export function RolePermissionForm({ onCompleted, role }: Props) {
  const { methods, permissions, onSubmit, submitting } = useRolePermission(role, onCompleted);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFAutocomplete
          name="permissionName"
          limit={30}
          placeholder="Name"
          data={permissions.map((p) => p.name) ?? []}
        />
        <Button loading={submitting} type="submit">
          Submit
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalRolePermissionForm({
  role,
  ...modalProps
}: {
  role: Role | null;
} & Omit<ModalProps, 'role'>) {
  return (
    <Modal centered {...modalProps} title={`สิทธิในการเข้าใช้งาน ${role?.name}`}>
      {role && <RolePermissionForm onCompleted={modalProps.onClose} role={role} />}
    </Modal>
  );
}
