import { Box, Button, Flex, Group, Modal, ModalProps } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFDateInput from '@src/components/hook-form/rhf-date';
import RHFFilesUploadButton from '@src/components/hook-form/rhf-files-button';
import RHFNumberInput from '@src/components/hook-form/rhf-number';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import RHFTextarea from '@src/components/hook-form/rhf-text-area';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { courseImplementationSteps } from '../const';
import { useCurriculumApprove } from './hook';
import { CurriculumApproveForm as CurriculumApproveFormInput } from './types';

type Props = {
  onCompleted?: VoidFunction;
  raw: Partial<CurriculumApproveFormInput> & { activityId: string };
};
export function CurriculumApproveForm({ onCompleted, raw }: Props) {
  const { methods, onSubmit, submitting } = useCurriculumApprove(raw, onCompleted);
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Flex direction={'column'} gap={'sm'}>
        <RHFTextInput name={'title'} label="เรื่อง" />
        <Group>
          <RHFTextInput name={'time'} label="ครั้งที่" />
          <RHFNumberInput name={'agenda'} label="วาระ" />
        </Group>
        <Group>
          <RHFDateInput name={'date'} label="วันที่" />
          <RHFRedioGroup
            name={'approve'}
            options={[
              {
                label: 'เห็นชอบ',
                value: '1',
              },
              {
                label: 'ไม่เห็นชอบ',
                value: '0',
              },
            ]}
            label="ผลการพิจารณา"
          />
        </Group>
        <RHFTextarea name={'note'} label={'ข้อเสนอแนะ'} />
        <Box>
          <RHFFilesUploadButton name={'attachFiles'} label={'เอกสารเพิ่มเติม'} />
        </Box>
        <Button loading={submitting} type="submit">
          Submit
        </Button>
      </Flex>
    </FormProvider>
  );
}

export function ModalCurriculumApproveForm({
  raw,
  onCompleted,
  ...modalProps
}: {
  raw?: (Partial<CurriculumApproveFormInput> & { activityId: string; step: CurriculumApproveFormInput['step'] }) | null;
  onCompleted?: VoidFunction;
} & Omit<ModalProps, 'raw'>) {
  return (
    <Modal centered {...modalProps} title={raw ? courseImplementationSteps.get(raw?.step)?.label : undefined}>
      {raw && <CurriculumApproveForm onCompleted={onCompleted} raw={raw} />}
    </Modal>
  );
}
