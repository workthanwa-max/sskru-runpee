'use client';

import {
    Box,
    Button,
    Card,
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
    useMantineTheme,
} from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import Iconify from '@src/components/iconify';
import EnrollmentLayout, { ENROLLMENT_SECTIONS } from '@src/layout/enrollment-layout';
import { useAuthContext } from '@src/auth/hooks';
import { useRestMutation, useRestQuery } from '@src/hooks/use-rest';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { endpoints } from '@src/utils/axios';
import useFormPersist from 'react-hook-form-persist';
import { EnrollmentStep } from '../constant';
import ApplicantConfirmation from '../enrollment/applicant-confirmation';
import { FORM_PERSIST_KEY } from '../enrollment/constant';
import DocumentationForm from '../enrollment/document-form';
import { useEnrollment } from '../enrollment/hook';
import ParentInfoForm from '../enrollment/parent-info-form';
import AddressInput from '../enrollment/inputs/address-input';
import PersonnelInput from '../enrollment/inputs/personal-input';
import SubjectInput from '../enrollment/inputs/subject-input';

// Map URL-based sections to form components
const SECTION_COMPONENTS: Record<string, React.FC<any>> = {
  'course-selection': SubjectInput,
  'personal-info': () => <PersonnelInput prefixInputObjectName="personalInfo" />,
  'address-info': () => <AddressInput prefixInputObjectName="addressInfo" />,
  'family-info': ParentInfoForm,
  'education-info': DocumentationForm,
  'review-confirm': ApplicantConfirmation,
};

// Map EnrollmentStep enum to section keys
const STEP_TO_SECTION: Record<EnrollmentStep, string> = {
  [EnrollmentStep.COURSE_SELECTION]: 'course-selection',
  [EnrollmentStep.PERSONAL_INFO]: 'personal-info',
  [EnrollmentStep.ADDRESS_INFO]: 'address-info',
  [EnrollmentStep.FAMILY_INFO]: 'family-info',
  [EnrollmentStep.EDUCATION_INFO]: 'education-info',
  [EnrollmentStep.REVIEW_CONFIRM]: 'review-confirm',
};

const SECTION_PATHS: Record<string, string> = {
  'course-selection': paths.admission.enrollment.courseSelection,
  'personal-info': paths.admission.enrollment.personalInfo,
  'address-info': paths.admission.enrollment.addressInfo,
  'family-info': paths.admission.enrollment.familyInfo,
  'education-info': paths.admission.enrollment.educationInfo,
  'review-confirm': paths.admission.enrollment.reviewConfirm,
};

// Sections that are considered "completed" once navigated past
function getCompletedSections(activeSection: string): string[] {
  const idx = ENROLLMENT_SECTIONS.findIndex((s) => s.key === activeSection);
  return ENROLLMENT_SECTIONS.slice(0, idx).map((s) => s.key);
}

type EnrollmentViewProps = {
  enrollmentStep: EnrollmentStep;
  activeSection?: string;
};

export default function EnrollmentView({ enrollmentStep, activeSection: activeSectionProp }: EnrollmentViewProps) {
  const activeSection = activeSectionProp ?? STEP_TO_SECTION[enrollmentStep] ?? 'applicant-info';
  const router = useRouter();
  const theme = useMantineTheme();
  const sections = ENROLLMENT_SECTIONS;
  const activeIndex = sections.findIndex((s) => s.key === activeSection);
  const completedSections = getCompletedSections(activeSection);

  const isLastSection = activeIndex === sections.length - 1;
  const currentSection = sections[activeIndex];

  const onPrevSection = () => {
    if (activeIndex === 0) return;
    const prev = sections[activeIndex - 1];
    router.push(SECTION_PATHS[prev.key]);
  };

  const onSectionChange = (key: string) => {
    router.push(SECTION_PATHS[key]);
  };

  // Re-use the original enrollment hook with the appropriate step
  const enrollmentStepForHook = Object.entries(STEP_TO_SECTION).find(([, v]) => v === activeSection)?.[0] as EnrollmentStep ?? enrollmentStep;
  const { user } = useAuthContext();
  const { data: existingStudent, refetch: refetchStudent } = useRestQuery(user?.id ? endpoints.student.details(user.id) : null);
  
  const [createStudent] = useRestMutation(endpoints.student.list, 'POST');
  const [updateStudent] = useRestMutation(user?.id ? endpoints.student.details(user.id) : '', 'PATCH');

  const onNextSection = async () => {
    if (isLastSection) {
      const fullData = methods.getValues();
      
      const payload = {
        id: user?.id,
        studentId: fullData.personalInfo?.personnelId || user?.username || user?.id,
        firstname: fullData.personalInfo?.firstname,
        lastname: fullData.personalInfo?.lastname,
        phone: fullData.personalInfo?.phone,
        email: fullData.personalInfo?.email,
        program: fullData.programType,
        year: 2567, // Default academic year
        address: `${fullData.addressInfo?.houseNumber || ''} ${fullData.addressInfo?.moo || ''} ${fullData.addressInfo?.street || ''} ${fullData.addressInfo?.subDistrict || ''} ${fullData.addressInfo?.district || ''} ${fullData.addressInfo?.province || ''} ${fullData.addressInfo?.postalCode || ''}`.trim(),
        parentInfo: fullData.parentInfo,
        educationInfo: fullData.qualification,
        status: 'pending'
      };

      try {
        if (existingStudent) {
          await updateStudent(payload);
        } else {
          await createStudent(payload);
        }
        
        // Clear persistence and go to success/receipt
        sessionStorage.removeItem(FORM_PERSIST_KEY);
        router.push(paths.admission.receipt);
      } catch (err) {
        console.error('Failed to submit enrollment', err);
      }
      return;
    }
    const next = sections[activeIndex + 1];
    router.push(SECTION_PATHS[next.key]);
  };

  const { methods, submitting, onSubmit, watch, setValue } = useEnrollment(enrollmentStepForHook, onNextSection);

  useFormPersist(FORM_PERSIST_KEY, { watch, setValue });

  const FormItem = SECTION_COMPONENTS[activeSection] ?? (() => <SubjectInput />);

  return (
    <EnrollmentLayout
      activeSection={activeSection}
      onSectionChange={onSectionChange}
      completedSections={completedSections}
    >
      <Stack spacing="xl">
        {/* Section Header */}
        <Paper
          p="xl"
          radius="xl"
          sx={{
            background: `linear-gradient(135deg, ${theme.colors.sskruGold[6]} 0%, ${theme.colors.sskruGold[9]} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Iconify
            icon={currentSection?.icon ?? 'solar:document-text-bold-duotone'}
            width={180}
            style={{ position: 'absolute', right: -20, top: -20, opacity: 0.1 }}
          />
          <Group spacing="md" sx={{ position: 'relative', zIndex: 1 }}>
            <ThemeIcon size={56} radius="xl" variant="light">
              <Iconify icon={currentSection?.icon} width={30} />
            </ThemeIcon>
            <Box>
              <Text size="xs" fw={700} sx={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1 }}>
                ขั้นตอนที่ {activeIndex + 1} จาก {sections.length}
              </Text>
              <Title order={2} sx={{ fontWeight: 900, fontSize: '1.6rem' }}>
                {currentSection?.label}
              </Title>
              <Text size="sm" sx={{ opacity: 0.85 }}>{currentSection?.description}</Text>
            </Box>
          </Group>
        </Paper>

        {/* Form Card */}
        <Card
          p="xl"
          radius="xl"
          sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.colors.gray[2]}`,
            boxShadow: '0 4px 20px rgba(197, 160, 40, 0.05)',
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing="xl">
              <FormItem />

              <Divider />

              {/* Navigation Buttons */}
              <Group position="apart">
                {activeIndex > 0 ? (
                  <Button
                    variant="outline"
                    color="sskruGold"
                    radius="md"
                    leftIcon={<Iconify icon="solar:arrow-left-bold-duotone" width={18} />}
                    onClick={onPrevSection}
                  >
                    ย้อนกลับ
                  </Button>
                ) : (
                  <Button
                    variant="subtle"
                    color="red"
                    radius="md"
                    leftIcon={<Iconify icon="solar:close-circle-bold-duotone" width={18} />}
                    onClick={() => router.push(paths.admission.root)}
                  >
                    ยกเลิก
                  </Button>
                )}

                <Button
                  type="submit"
                  color="sskruGold"
                  radius="md"
                  loading={submitting}
                  rightIcon={
                    !isLastSection
                      ? <Iconify icon="solar:arrow-right-bold-duotone" width={18} />
                      : <Iconify icon="solar:verified-check-bold-duotone" width={18} />
                  }
                  sx={{ boxShadow: '0 8px 20px rgba(197, 160, 40, 0.2)' }}
                >
                  {isLastSection ? 'ยืนยันและส่งใบสมัคร' : 'บันทึกและถัดไป'}
                </Button>
              </Group>
            </Stack>
          </FormProvider>
        </Card>
      </Stack>
    </EnrollmentLayout>
  );
}
