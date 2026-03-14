import { paths } from '@src/routes/paths';

export enum ProgramType {
  REGULAR = 'REGULAR',
  PART_TIME = 'PART_TIME',
  GRADUATE = 'GRADUATE',
}
export const programTypeInfo = new Map([
  [
    ProgramType.REGULAR,
    { label: 'ภาคปกติ', program: ProgramType.REGULAR, href: paths.admission.enrollment.applicantInfo },
  ],
  [
    ProgramType.PART_TIME,
    { label: 'ภาคกศ.บป', program: ProgramType.PART_TIME, href: paths.admission.enrollment.applicantInfo },
  ],
  [
    ProgramType.GRADUATE,
    { label: 'ภาคบัณฑิต', program: ProgramType.GRADUATE, href: paths.admission.enrollment.applicantInfo },
  ],
]);
export enum EnrollmentStep {
  APPLICANT_INFO = 'APPLICANT_INFO',
  PARENT_INFO = 'PARENT_INFO',
  ATTACH_DOCUMENTS = 'ATTACH_DOCUMENTS',
  CONFIRM_APPLICATION = 'CONFIRM_APPLICATION',
}

export const enrollmentStepInfo = new Map([
  [
    EnrollmentStep.APPLICANT_INFO,
    {
      label: 'ข้อมูลผู้สมัคร',
      step: EnrollmentStep.APPLICANT_INFO,
      order: 1,
      href: paths.admission.enrollment.applicantInfo,
    },
  ],
  [
    EnrollmentStep.PARENT_INFO,
    {
      label: 'ข้อมูลผู้ปกครอง',
      step: EnrollmentStep.PARENT_INFO,
      order: 2,
      href: paths.admission.enrollment.parentInfo,
    },
  ],
  [
    EnrollmentStep.ATTACH_DOCUMENTS,
    {
      label: 'แนบหลักฐาน',
      step: EnrollmentStep.ATTACH_DOCUMENTS,
      order: 3,
      href: paths.admission.enrollment.documentation,
    },
  ],
  [
    EnrollmentStep.CONFIRM_APPLICATION,
    {
      label: 'ยืนยันการสมัคร',
      step: EnrollmentStep.CONFIRM_APPLICATION,
      order: 4,
      href: paths.admission.enrollment.confirmation,
    },
  ],
]);
