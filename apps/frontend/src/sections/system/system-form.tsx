import { Button, Flex, Group, Modal, ModalProps, Text } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFCheckbox from '@src/components/hook-form/rhf-checkbox';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { System } from '@src/types/domain';
import { useSystem } from './system-hook';

type Props = {
  onCompleted: VoidFunction;
  role?: System | null;
};
export function SystemForm({ onCompleted, role }: Props) {
  const { methods, onSubmit, submitting } = useSystem(role, onCompleted);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFTextInput required placeholder="name" name="name" />
        <RHFTextInput required placeholder="note" name="note" />
        <Group sx={{ border: '1px solid #00000030', borderRadius: 3 }} spacing={0}>
          <Text m={0} ml={'xs'} color="#000000" fw={'lighter'}>
            {typeof window !== 'undefined' ? window.location.origin : ''}/
          </Text>
          <RHFTextInput required variant="unstyled" placeholder="url" name="url" sx={{ flex: 1 }} />
        </Group>
        <Group>
          <RHFCheckbox label={'สาธารณะ'} name="loginRequired" />
          <RHFCheckbox label={'เปิดใช้งาน'} name="active" />
        </Group>
        <Button loading={submitting} type="submit">
          บันทึก
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalSystemForm({
  role,
  ...modalProps
}: {
  role?: System | null;
} & Omit<ModalProps, 'role'>) {
  return (
    <Modal centered {...modalProps} title={`ระบบ`}>
      <SystemForm onCompleted={modalProps.onClose} role={role} />
    </Modal>
  );
}
