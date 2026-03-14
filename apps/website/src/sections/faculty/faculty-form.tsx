import { Button, Flex, Loader, Modal, ModalProps, SelectItem } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFSelect from '@src/components/hook-form/rhf-select';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { useRestQuery } from '@src/hooks/use-rest';
import { Faculty } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';
import { useFaculty } from './faculty-hook';

type Props = {
  onCompleted: VoidFunction;
  raw?: Faculty | null;
};

export function FacultyForm({ onCompleted, raw }: Props) {
  const { methods, onSubmit, submitting } = useFaculty(raw, onCompleted);
  const { data: faculties, loading } = useRestQuery<Faculty[]>(endpoints.faculty.list);

  const options =
    faculties
      ?.filter((f) => !f.parentId)
      .map(
        (d): SelectItem => ({
          value: d.id,
          label: d.name,
        })
      ) ?? [];

  if (loading) {
    return <Loader />;
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFTextInput name="name" required placeholder="ชื่อ" />
        <RHFTextInput name="shortName" required placeholder="ชื่อย่อ" />
        <RHFTextInput name="description" placeholder="คำอธิบายเพิ่มเติม" />
        <RHFSelect searchable name="parentId" limit={30} placeholder="สังกัด" data={options} />
        <Button loading={submitting} type="submit">
          บันทึก
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalFacultyForm({
  raw,
  ...modalProps
}: {
  raw?: Faculty | null;
} & Omit<ModalProps, 'raw'>) {
  return (
    <Modal centered {...modalProps} title={`หน่วยงาน`}>
      <FacultyForm onCompleted={modalProps.onClose} raw={raw} />
    </Modal>
  );
}
