import { Button, Flex, Loader, Modal, ModalProps } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import { RHFCheckboxGroup } from '@src/components/hook-form/rhf-checkbox';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { useRestQuery } from '@src/hooks/use-rest';
import { Permission, System } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';
import { usePermission } from './permission-hook';

type Props = {
  onCompleted?: (info: Permission) => void;
  permission?: Permission | null;
};

export function PermissionForm({ onCompleted, permission }: Props) {
  const { data: systems, loading } = useRestQuery<System[]>(endpoints.system.list);
  const { methods, onSubmit, submitting } = usePermission(permission, onCompleted);

  const options = systems?.map((node) => ({ label: node.name, value: node.id, description: node.url })) ?? [];

  if (loading) {
    return <Loader />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFTextInput required placeholder="ชื่อ" name="name" />
        <RHFCheckboxGroup name="systemIds" options={options} />
        <Button loading={submitting} type="submit">
          บันทึก
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalPermissionForm({
  permission,
  onCompleted,
  ...modalProps
}: {
  permission?: Permission | null;
  onCompleted?: (info: Permission) => void;
} & Omit<ModalProps, 'permission'>) {
  return (
    <Modal centered {...modalProps} title={`สิทธิในการเข้าใช้งาน`}>
      <PermissionForm onCompleted={onCompleted} permission={permission} />
    </Modal>
  );
}
