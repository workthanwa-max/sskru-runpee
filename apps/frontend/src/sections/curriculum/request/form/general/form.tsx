import { Button, Card, Group, Text } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import { RHFCheckboxGroup } from '@src/components/hook-form/rhf-checkbox';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { OBJECTIVE_RADIOS } from './constant';
import GeneralInfoForm from './general-info';
import { CurriculumReqGeneralInfo, useCurriculumReqGeneral } from './hook';
import GeneralModelSection from './model';
type CurriculumReqGeneralFormProps = {
  raw: CurriculumReqGeneralInfo;
};
export default function CurriculumReqGeneralForm(props: CurriculumReqGeneralFormProps) {
  const router = useRouter();
  const { methods, onSubmit, submitting } = useCurriculumReqGeneral(props.raw, () =>
    router.push(paths.curriculum.request.sections(props.raw.id).curriculum()),
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <Card.Section px={'sm'} py={'xl'}>
          <Text fw={'bold'} size={'lg'}>
            ส่วนที่ 1 ข้อมูลทั่วไป
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
          id={'model'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            รูปแบบของหลักสูตร
          </Text>
        </Card.Section>
        <GeneralModelSection />
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
            ประโยชน์ที่ได้รับเมื่อจบหลักสูตร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <RHFCheckboxGroup vertical name={'benefits'} options={OBJECTIVE_RADIOS} />
        </Card.Section>
        <Card.Section p={'md'} mt={20} withBorder>
          <Group position="apart">
            <Button variant="outline" color="red">
              ยกเลิก/ลบคำร้อง
            </Button>
            <Button color="blue" type="submit" loading={submitting}>
              ถัดไป
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </FormProvider>
  );
}
