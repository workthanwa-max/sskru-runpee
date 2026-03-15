import { paths } from '@src/routes/paths';

export enum ProgramType {
  REGULAR = 'REGULAR',
  PART_TIME = 'PART_TIME',
  GRADUATE = 'GRADUATE',
}
export const programTypeInfo = new Map([
  [
    ProgramType.REGULAR,
    { label: 'ภาคปกติ', program: ProgramType.REGULAR, href: paths.admission.enrollment.courseSelection },
  ],
  [
    ProgramType.PART_TIME,
    { label: 'ภาคกศ.บป', program: ProgramType.PART_TIME, href: paths.admission.enrollment.courseSelection },
  ],
  [
    ProgramType.GRADUATE,
    { label: 'ภาคบัณฑิต', program: ProgramType.GRADUATE, href: paths.admission.enrollment.courseSelection },
  ],
]);
export enum EnrollmentStep {
  COURSE_SELECTION = 'COURSE_SELECTION',
  PERSONAL_INFO = 'PERSONAL_INFO',
  ADDRESS_INFO = 'ADDRESS_INFO',
  FAMILY_INFO = 'FAMILY_INFO',
  EDUCATION_INFO = 'EDUCATION_INFO',
  REVIEW_CONFIRM = 'REVIEW_CONFIRM',
}

export const enrollmentStepInfo = new Map([
  [
    EnrollmentStep.COURSE_SELECTION,
    {
      label: 'เลือกหลักสูตร',
      step: EnrollmentStep.COURSE_SELECTION,
      order: 1,
      href: paths.admission.enrollment.courseSelection,
    },
  ],
  [
    EnrollmentStep.PERSONAL_INFO,
    {
      label: 'ข้อมูลส่วนตัว',
      step: EnrollmentStep.PERSONAL_INFO,
      order: 2,
      href: paths.admission.enrollment.personalInfo,
    },
  ],
  [
    EnrollmentStep.ADDRESS_INFO,
    {
      label: 'สถานที่ติดต่อ',
      step: EnrollmentStep.ADDRESS_INFO,
      order: 3,
      href: paths.admission.enrollment.addressInfo,
    },
  ],
  [
    EnrollmentStep.FAMILY_INFO,
    {
      label: 'ข้อมูลครอบครัว',
      step: EnrollmentStep.FAMILY_INFO,
      order: 4,
      href: paths.admission.enrollment.familyInfo,
    },
  ],
  [
    EnrollmentStep.EDUCATION_INFO,
    {
      label: 'วุฒิการศึกษา',
      step: EnrollmentStep.EDUCATION_INFO,
      order: 5,
      href: paths.admission.enrollment.educationInfo,
    },
  ],
  [
    EnrollmentStep.REVIEW_CONFIRM,
    {
      label: 'ตรวจสอบข้อมูล',
      step: EnrollmentStep.REVIEW_CONFIRM,
      order: 6,
      href: paths.admission.enrollment.reviewConfirm,
    },
  ],
]);
