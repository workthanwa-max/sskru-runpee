import { Button, Flex, Loader, Modal, ModalProps, SelectItem } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFSelect from '@src/components/hook-form/rhf-select';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Personnel, Faculty } from '@src/types/domain';
import { usePersonnel } from './personnel-hook';

type Props = {
  onCompleted: VoidFunction;
  item: Personnel;
};
export function PersonnelFacultyForm({ onCompleted, item }: Props) {
  const { methods, onSubmit, submitting } = usePersonnel(item, onCompleted);
  const { data: faculties, loading } = useRestQuery<Faculty[]>(endpoints.faculty.list);
  const options =
    faculties?.map(
      (d): SelectItem => ({
        value: d.id,
        label: `${d.name}${!d.parentId ? '(ทุกสาขา)' : ''}`,
      }),
    ) ?? [];

  if (loading) {
    return <Loader />;
  }
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFSelect searchable name="facultyId" description="คณะ / สาขา" limit={30} label="สังกัด" data={options} />
        <Button loading={submitting} type="submit">
          Submit
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalPersonnelFacultyForm({
  item,
  ...modalProps
}: {
  item: Personnel | null;
} & Omit<ModalProps, 'item'>) {
  return (
    <Modal centered {...modalProps} title={`หน่วยงาน`}>
      {item && <PersonnelFacultyForm onCompleted={modalProps.onClose} item={item} />}
    </Modal>
  );
}
