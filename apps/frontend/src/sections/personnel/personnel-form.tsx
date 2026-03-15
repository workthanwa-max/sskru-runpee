import {
    Box,
    Button,
    FileInput,
    Flex,
    Group,
    Modal,
    ModalProps, Stack,
    Tabs,
    TabsValue,
    Text
} from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFNumberInput from '@src/components/hook-form/rhf-number';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { TEMPLETE_PERSONNEL_UPLOAD } from '@src/config-global';
import { RouterLink } from '@src/routes/components';
import { Personnel } from '@src/types/domain';
import { useCallback, useState } from 'react';
import { usePersonnel } from './personnel-hook';
import { usePersonnelUpload } from './personnel-upload-hook';

type Props = {
  onCompleted: VoidFunction;
  raw?: Personnel | null;
};

export function PersonnelForm({ onCompleted, raw }: Props) {
  const { methods, onSubmit, submitting } = usePersonnel(raw, onCompleted);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <Group>
          <RHFTextInput name="firstname" label="ชื่อ" required />
          <RHFTextInput name="lastname" label="นามสกุล" required />
        </Group>
        <RHFTextInput name="personnelId" label="รหัสบุคลากร" required />
        <RHFTextInput name="phone" label="เบอร์โทรศัพท์" required />
        <RHFTextInput name="academicPosition" label="ตำแหน่งทางวิชาการ" />
        <RHFTextInput name="highestEducation" label="วุฒิการศึกษาสูงสุด" required />
        <RHFTextInput name="programOrField" label="หลักสูตรหรือสาขาวิชาที่จบการศึกษา" required />
        <Group>
          <RHFTextInput name="university" label="มหาวิทยาลัยที่จบการศึกษาสูงสุด" required />
          <RHFNumberInput name="graduationYear" label="ปีที่สำเร็จการศึกษาสูงสุด" required />
        </Group>
        <Button loading={submitting} type="submit">
          บันทึก
        </Button>
      </Flex>
    </FormProvider>
  );
}

type PersonnelUploadFormProps = {
  onCompleted?: VoidFunction;
};

export function PersonnelUploadForm({ onCompleted }: PersonnelUploadFormProps) {
  const { handleUpload, progress, callImport } = usePersonnelUpload();

  const [value, setValue] = useState<File | null>(null);

  const callUpload = useCallback(async () => {
    if (value) {
      const upload = await handleUpload(value);
      if (upload?.gsPath) {
        await callImport();
      }
      onCompleted?.();
    }
  }, [callImport, handleUpload, onCompleted, value]);

  return (
    <Stack spacing={5}>
      <FileInput
        accept=".csv, .xls, .xlsx"
        value={value}
        label="คลิกเพื่ออัพโหลด"
        description="รองรับ csv, .xls, .xlsx"
        onChange={setValue}
      />
      <Text size={'xs'} color="blue" component={RouterLink} href={TEMPLETE_PERSONNEL_UPLOAD} target="_blank">
        ดูตัวอย่าง
      </Text>
      <Box />
      <Box />
      <Box />
      <Button loading={progress.isUploading} onClick={callUpload}>
        Submit
      </Button>
    </Stack>
  );
}

export function ModalPersonnelForm({
  raw,
  ...modalProps
}: {
  raw?: Personnel | null;
} & Omit<ModalProps, 'raw'>) {
  const [tab, settab] = useState<TabsValue>('0');
  return (
    <Modal
      {...modalProps}
      centered
      size={'lg'}
      title={
        <Tabs value={tab} onTabChange={settab} variant="pills">
          <Tabs.List>
            <Tabs.Tab value="0">บุลคลากร</Tabs.Tab>
            <Tabs.Tab value="1">อัพโหลด</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      }
    >
      {tab === '0' ? (
        <PersonnelForm onCompleted={modalProps.onClose} raw={raw} />
      ) : (
        <PersonnelUploadForm onCompleted={modalProps.onClose} />
      )}
    </Modal>
  );
}
