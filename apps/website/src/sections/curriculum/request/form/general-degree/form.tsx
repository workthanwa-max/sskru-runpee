import { Button, Card, Group, Text } from '@mantine/core';
import AlertFormErrors from '@src/components/alert/form-errors';
import FormProvider from '@src/components/hook-form';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { CurriculumReqGeneralInfo } from '../general/hook';
import { FileAttributes } from './file-attributes';
import GeneralInfoForm from './general-info';
import { useCurriculumReqGeneralDegree } from './hook';
type CurriculumReqGeneralFormProps = {
  raw: CurriculumReqGeneralInfo;
};
export default function CurriculumReqGeneralDegree(props: CurriculumReqGeneralFormProps) {
  const router = useRouter();
  const { methods, onSubmit, submitting, formErrors } = useCurriculumReqGeneralDegree(props.raw, () =>
    router.push(paths.curriculum.request.root),
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <AlertFormErrors items={formErrors} />
        <Card.Section px={'sm'} py={'xl'}>
          <Text fw={'bold'} size={'lg'}>
            ข้อมูลทั่วไป
          </Text>
        </Card.Section>

        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'name'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            รหัสและชื่อหลักสูตร
          </Text>
        </Card.Section>
        <GeneralInfoForm />
        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'benefits'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            แนบไฟล์
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <FileAttributes />
        </Card.Section>
        <Card.Section p={'md'} mt={20} withBorder>
          <Group position="right">
            <Button color="green" type="submit" loading={submitting}>
              บันทึก
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </FormProvider>
  );
}
