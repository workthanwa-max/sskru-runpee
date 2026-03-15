import { Box, Button, Card, FileButton, Grid, Group, Stack, Text } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFNumberInput from '@src/components/hook-form/rhf-number';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import RHFTextarea from '@src/components/hook-form/rhf-text-area';
import { RouterLink } from '@src/routes/components';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { extractFilename } from '@src/utils/file';
import { useEffect, useMemo } from 'react';
import { INCOMES } from './constant';
import { CurriculumBudgetInfo, useCurriculumReqBudget } from './hook';
import InputApplicantQualificationConditions from './input-applicant-qualification-conditions';

type CurriculumReqBudgetFormProps = {
  raw: CurriculumBudgetInfo;
};
export default function CurriculumReqBudgetForm(props: CurriculumReqBudgetFormProps) {
  const router = useRouter();
  const { attachFile, setAttachFile, methods, onSubmit, watch, applicantQualificationInput, submitting } =
    useCurriculumReqBudget(props.raw, () => router.push(paths.curriculum.request.root));

  const hasFee = watch('hasFee') === '1';
  const fee = watch('fee');
  const minimumRegister = watch('minimumRegister');
  const summary = useMemo(
    () => ({
      fee,
      minimumRegister,
      total: fee * minimumRegister,
    }),
    [fee, minimumRegister],
  );

  useEffect(() => {
    if (props.raw.attachFile) {
      setAttachFile(props.raw.attachFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.raw.attachFile]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <Card.Section px={'sm'} py={'xl'}>
          <Text fw={'bold'} size={'lg'}>
            ส่วนที่ 3 การรับสมัคร
          </Text>
        </Card.Section>

        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'registrant'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            จำนวนผู้ลงทะเบียนขั้นต่ำ
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <Group>
            <Text align="right">จำนวนผู้ลงทะเบียนขั้นต่ำที่จะเปิดหลักสูตรฝึกอบรม</Text>
            <RHFNumberInput name={'minimumRegister'} />
            <Text align="left">คน</Text>
          </Group>
        </Card.Section>

        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'training'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            ค่าธรรมเนียมในการอบรม
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <Stack>
            <Group h={80} align="end">
              <RHFRedioGroup
                name={'hasFee'}
                options={[
                  {
                    value: '0',
                    label: 'ไม่เก็บค่าธรรมเนียม',
                  },
                  {
                    value: '1',
                    label: 'จำนวน',
                  },
                ]}
              />
              {hasFee && (
                <Group>
                  <RHFNumberInput name={'fee'} w={240} />
                  <Text>บาท</Text>
                </Group>
              )}
            </Group>
            <RHFTextarea label={'หมายเหตุ'} name={'applicantQualificationConditions.0.condition'} />
          </Stack>
        </Card.Section>

        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'revenue'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            ประมาณการรายรับ
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <Stack>
            <Box p={'sm'} h={54}>
              <Text size={16}>งบประมาณจากธรรมเนียมการฝึกอบรม</Text>
            </Box>

            {INCOMES.map((input, i) => (
              <Grid key={i} mb={'xs'}>
                <Grid.Col span={4}>
                  <Text align="right">{input.name}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text align="center">{summary[input.key]}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text align="left">{input.unit}</Text>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </Card.Section>

        {/* <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'expenses'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            ประมาณการรายจ่าย
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <InputExpenseEstimate {...expenseEstimateInput} />
        </Card.Section> */}

        {/* <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'feature'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            คุณสมบัติผู้สมัคร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <RHFCheckboxGroup vertical name={'applicantQualifications'} options={candidateQualifications} />
        </Card.Section> */}

        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'condition'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            {/*NOTE: เดิมคือ เงื่อนไขคุณสมบัติของผู้สมัคร (ถ้ามี) */}
            คุณสมบัติผู้สมัคร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <InputApplicantQualificationConditions {...applicantQualificationInput} />
        </Card.Section>

        <Card.Section
          p={'sm'}
          h={54}
          bg={'#D7A126'}
          id={'upload'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <Text color="white" size={'lg'}>
            อัพโหลดเอกสารหลักสูตร
          </Text>
        </Card.Section>
        <Card.Section p={'md'} px={70}>
          <Card withBorder>
            <Group position="center">
              <FileButton
                onChange={setAttachFile}
                // accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button {...props} variant="outline">
                    เลือกไฟล์
                  </Button>
                )}
              </FileButton>
            </Group>

            {attachFile && (
              <Group position="center" align="center">
                <Text size="sm" mt="sm">
                  Picked file:
                </Text>

                {(attachFile as File).name ?? (
                  <Text
                    size="sm"
                    mt="sm"
                    component={RouterLink}
                    underline
                    color="blue"
                    href={attachFile as string}
                    target="_blank"
                  >
                    {extractFilename(attachFile as string)
                      ?.split('-')
                      .pop()}
                  </Text>
                )}
              </Group>
            )}
          </Card>
        </Card.Section>
        <Card.Section p={'md'} mt={20} withBorder>
          <Group position="apart">
            <Button
              variant="outline"
              component={RouterLink}
              href={paths.curriculum.request.sections(props.raw.id).curriculum()}
            >
              ย้อนกลับ
            </Button>
            <Button color="green" type="submit" loading={submitting}>
              บันทึก
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </FormProvider>
  );
}
