/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';
import { Box, Button, Card, Divider, Group, MediaQuery, Stack, Stepper, Text } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import useFormPersist from 'react-hook-form-persist';
import { EnrollmentStep, enrollmentStepInfo } from '../constant';
import ApplicantConfirmation from '../enrollment/applicant-confirmation';
import ApplicantInfoForm from '../enrollment/applicant-info-form';
import { FORM_PERSIST_KEY } from '../enrollment/constant';
import DocumentationForm from '../enrollment/document-form';
import { useEnrollment } from '../enrollment/hook';
import ParentInfoForm from '../enrollment/parent-info-form';

const FormElements = new Map([
  [EnrollmentStep.APPLICANT_INFO, ApplicantInfoForm],
  [EnrollmentStep.PARENT_INFO, ParentInfoForm],
  [EnrollmentStep.ATTACH_DOCUMENTS, DocumentationForm],
  [EnrollmentStep.CONFIRM_APPLICATION, ApplicantConfirmation],
]);

export default function EnrollmentView({ enrollmentStep }: { enrollmentStep: EnrollmentStep }) {
  const currentIndex = enrollmentStepInfo.get(enrollmentStep)!.order - 1;
  const enrollmentSteps = [...enrollmentStepInfo.values()].sort((a, b) => a.order - b.order);
  const router = useRouter();
  const onNextStep = () => {
    let to = enrollmentSteps[enrollmentStepInfo.get(enrollmentStep)!.order]?.href;
    if (enrollmentStep === EnrollmentStep.CONFIRM_APPLICATION) {
      to = paths.admission.root;
    }
    router.push(to);
  };
  const onPrevStep = () => {
    const to = enrollmentSteps[currentIndex - 1]?.href;
    router.push(to);
  };
  const onCalcel = () => {
    //
    router.push(paths.admission.root);
  };
  const FormItem = FormElements.get(enrollmentStep)!;
  const { methods, submitting, onSubmit, watch, setValue } = useEnrollment(enrollmentStep, onNextStep);

  useFormPersist(FORM_PERSIST_KEY, {
    watch,
    setValue,
  });

  return (
    <Card>
      <Stack>
        <Group position="apart">
          <Text size={'lg'} fw={'bold'} color="#D19509">
            สมัครเรียน
          </Text>

          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Stepper active={currentIndex} size="xs">
              {enrollmentSteps.map((item) => (
                <Stepper.Step label={`ขั้นตอนที่ ${item.order}`} description={item.label} key={item.order} />
              ))}
            </Stepper>
          </MediaQuery>
        </Group>

        <Divider />
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack>
            <FormItem />
            <Box />
            <Divider />
            <Box />
            <Group position="apart">
              {enrollmentStep === EnrollmentStep.APPLICANT_INFO && (
                <Button variant="outline" color="red" onClick={onCalcel}>
                  ยกเลิก
                </Button>
              )}
              {enrollmentStep !== EnrollmentStep.APPLICANT_INFO && (
                <Button variant="outline" onClick={onPrevStep}>
                  ย้อนกลับ
                </Button>
              )}
              <Button color="green" type="submit" loading={submitting}>
                {enrollmentStep === EnrollmentStep.CONFIRM_APPLICATION ? 'ยืนยัน' : 'ถัดไป'}
              </Button>
            </Group>
          </Stack>
        </FormProvider>
      </Stack>
    </Card>
  );
}
