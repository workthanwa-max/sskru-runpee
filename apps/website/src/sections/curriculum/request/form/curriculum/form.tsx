import { Box, Button, Card, Flex, Group, Text } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFTextarea from '@src/components/hook-form/rhf-text-area';
import { RouterLink } from '@src/routes/components';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { CurriculumReqCurriculum, useCurriculumReqCurriculum } from './hook';
import InputCourseStructures from './input-course-structure';
import InputLearningOutcomes from './input-learning-outcomes';
import InputObjectives from './input-objectives';

type CurriculumReqCurriculumFormProps = {
  raw: CurriculumReqCurriculum;
};
export default function CurriculumReqCurriculumForm(props: CurriculumReqCurriculumFormProps) {
  const router = useRouter();
  const { methods, onSubmit, objectiveInput, learningOutcomeInput, couseStructureInput, submitting } =
    useCurriculumReqCurriculum(props.raw, () => router.push(paths.curriculum.request.sections(props.raw.id).budget()));
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <Card.Section px={'sm'} py={'xl'}>
          <Text fw={'bold'} size={'lg'}>
            ส่วนที่ 2 หลักสูตร
          </Text>
        </Card.Section>
        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'objective'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            วัตถุประสงค์ของหลักสูตร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <InputObjectives {...objectiveInput} />
        </Card.Section>
        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'content'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            เนื้อหาหลักสูตร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <RHFTextarea name={'content'} />
        </Card.Section>
        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'result'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            ผลลัพธ์การเรียนรู้และการจัดกระบวนการเรียนรู้
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <InputLearningOutcomes {...learningOutcomeInput} />
        </Card.Section>
        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'result'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            โครงสร้างหลักสูตร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <Flex direction={'column'}>
            <InputCourseStructures {...couseStructureInput} />
            <Box mt={'lg'}>{/* <NumberOfHouseTable form={formStructure} /> */}</Box>
          </Flex>
        </Card.Section>
        <Card.Section p={'md'} mt={20} withBorder>
          <Group position="apart">
            <Button
              variant="outline"
              component={RouterLink}
              href={paths.curriculum.request.sections(props.raw.id).general()}
            >
              ย้อนกลับ
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
