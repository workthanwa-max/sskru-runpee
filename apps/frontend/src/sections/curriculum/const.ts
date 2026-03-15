import { EnumCourseImplementationStep } from './approve/schema';

export enum CurriculumActivityStatus {
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED',
  InProgress = 'IN_PROGRESS',
  Approved = 'APPROVED',
  Draft = 'DRAFT',
}

export const courseImplementationSteps = new Map([
  [EnumCourseImplementationStep.Enum.UNDER_CONSIDERATION, { order: 0, label: 'การพิจารณาหลักสูตร' }],
  [EnumCourseImplementationStep.Enum.ACADEMIC_COMMITTEE, { order: 1, label: 'กรรมการวิชาการ' }],
  [EnumCourseImplementationStep.Enum.ACADEMIC_COUNCIL, { order: 2, label: 'สภาวิชาการ' }],
  [EnumCourseImplementationStep.Enum.UNIVERSITY_COUNCIL, { order: 3, label: 'สภามหาวิทยาลัย' }],
  [EnumCourseImplementationStep.Enum.APPROVED, { order: 4, label: 'สำเร็จ' }],
]);

export const activityStatusMaps = new Map([
  [CurriculumActivityStatus.Rejected, { color: 'red', label: 'ไม่อนุมัติ' }],
  [CurriculumActivityStatus.Submitted, { color: 'blue', label: 'ยื่นคำร้องแล้ว' }],
  [CurriculumActivityStatus.InProgress, { color: 'yellow', label: 'กำลังดำเนินการ' }],
  [CurriculumActivityStatus.Approved, { color: 'green', label: 'สำเร็จ' }],
  [CurriculumActivityStatus.Draft, { color: 'gray', label: 'ฉบับร่าง' }],
]);

export const curriculumSectionMaps = new Map([
  ['general', { label: 'ข้อมูลทั่วไป' }],
  ['curriculum', { label: 'หลักสูตร' }],
  ['budget', { label: 'การรับสมัคร' }],
] as const);
