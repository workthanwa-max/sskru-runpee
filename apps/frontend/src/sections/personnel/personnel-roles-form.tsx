import { Button, Flex, Loader, Modal, ModalProps, SelectItem } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFMultiSelect from '@src/components/hook-form/rhf-multi-select';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Role } from '@src/types/domain';
import { usePersonnelRoles } from './personnel-roles-hook';
import type { PersonnelRolesForm as IPersonnelRolesForm } from './types';

type Props = {
  onCompleted: VoidFunction;
  item: IPersonnelRolesForm;
};
export function PersonnelRolesForm({ onCompleted, item }: Props) {
  const { methods, onSubmit, submitting } = usePersonnelRoles(item, onCompleted);
  const { data: roles, loading } = useRestQuery<Role[]>(endpoints.role.list);
  const options =
    roles?.map(
      (d): SelectItem => ({
        value: d.id,
        label: `${d.name}`,
      }),
    ) ?? [];

  if (loading) {
    return <Loader />;
  }
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFMultiSelect searchable name="roleIds" limit={30} label="ตำแหน่ง" data={options} />
        <Button loading={submitting} type="submit">
          Submit
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalPersonnelRolesForm({
  item,
  ...modalProps
}: {
  item: IPersonnelRolesForm | null;
} & Omit<ModalProps, 'item'>) {
  return (
    <Modal centered {...modalProps} title={`ตำแหน่ง`}>
      {item && <PersonnelRolesForm onCompleted={modalProps.onClose} item={item} />}
    </Modal>
  );
}
