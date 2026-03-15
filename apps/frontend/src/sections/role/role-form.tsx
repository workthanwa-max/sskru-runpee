import { Button, Flex, Modal, ModalProps } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { Role, RoleType } from '@src/types/domain';
import { RoleTypeLabel } from './const';
import { useRole } from './role-hook';

type Props = {
  onCompleted: VoidFunction;
  role?: Role | null;
};
export function RoleForm({ onCompleted, role }: Props) {
  const { methods, onSubmit, submitting } = useRole(role, onCompleted);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFTextInput required label="ตำแหน่ง" name="name" />
        <RHFRedioGroup
          required
          name="type"
          label="ประเภทผู้ใช้"
          options={[
            { label: RoleTypeLabel[RoleType.STUDENT], value: RoleType.STUDENT },
            { label: RoleTypeLabel[RoleType.PERSONNEL], value: RoleType.PERSONNEL },
          ]}
        />
        <Button loading={submitting} type="submit">
          บันทึก
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalRoleForm({
  role,
  ...modalProps
}: {
  role?: Role | null;
} & Omit<ModalProps, 'role'>) {
  return (
    <Modal centered {...modalProps} title={`สิทธิในการเข้าใช้งาน`}>
      <RoleForm onCompleted={modalProps.onClose} role={role} />
    </Modal>
  );
}
